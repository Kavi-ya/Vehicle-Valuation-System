package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"strconv"
	"time"

	"aw-associates/backend/db"
	"aw-associates/backend/middleware"
	"aw-associates/backend/models"
)

const uploadsDir = `e:\AW Associate\aw-dashboard\uploads`

// ─── Auth ────────────────────────────────────────────────────────────────────

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid JSON"))
		return
	}

	row := db.DB.QueryRow(
		`SELECT id, username, first_name, last_name, email, phone, role, branch, status, emp_id, created_at, password_hash
		 FROM users WHERE LOWER(username) = LOWER(?)`, req.Username)

	var u models.User
	var pwdHash string
	var createdAtStr *string
	err := row.Scan(&u.ID, &u.Username, &u.FirstName, &u.LastName,
		&u.Email, &u.Phone, &u.Role, &u.Branch, &u.Status, &u.EmpID, &createdAtStr, &pwdHash)

	if err != nil {
		log.Printf("Login: user lookup error for '%s': %v", req.Username, err)
		writeJSON(w, http.StatusUnauthorized, apiErr("Invalid credentials"))
		return
	}

	if createdAtStr != nil {
		t, _ := time.Parse("2006-01-02 15:04:05", *createdAtStr)
		u.CreatedAt = t
	}

	if pwdHash != req.Password {
		log.Printf("Login: password mismatch for user '%s'", req.Username)
		writeJSON(w, http.StatusUnauthorized, apiErr("Invalid credentials"))
		return
	}

	if string(req.Role) != "" && string(u.Role) != string(req.Role) {
		log.Printf("Login: role mismatch for user '%s'", req.Username)
		writeJSON(w, http.StatusUnauthorized, apiErr("Role mismatch"))
		return
	}

	token := middleware.CreateToken(u.ID, u.Username, string(u.Role), u.Branch)
	writeJSON(w, http.StatusOK, models.APIResponse{
		Success: true,
		Data: models.LoginResponse{
			Token: token,
			User:  u,
		},
	})
}

func Logout(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Logged out"})
}

// ─── Users ───────────────────────────────────────────────────────────────────

func GetUsers(w http.ResponseWriter, r *http.Request) {
	page, perPage := pagination(r)
	offset := (page - 1) * perPage

	var total int
	db.DB.QueryRow(`SELECT COUNT(*) FROM users`).Scan(&total)

	rows, err := db.DB.Query(
		`SELECT id, username, first_name, last_name, email, phone, role, branch, status, emp_id, created_at
		 FROM users ORDER BY id DESC LIMIT ? OFFSET ?`, perPage, offset)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("DB error"))
		return
	}
	defer rows.Close()

	users := []models.User{}
	for rows.Next() {
		var u models.User
		var createdAtStr *string
		rows.Scan(&u.ID, &u.Username, &u.FirstName, &u.LastName,
			&u.Email, &u.Phone, &u.Role, &u.Branch, &u.Status, &u.EmpID, &createdAtStr)
		if createdAtStr != nil {
			t, _ := time.Parse("2006-01-02 15:04:05", *createdAtStr)
			u.CreatedAt = t
		}
		users = append(users, u)
	}
	writeJSON(w, http.StatusOK, models.APIResponse{
		Success: true,
		Data: models.PaginatedResponse{
			Items:   users,
			Total:   total,
			Page:    page,
			PerPage: perPage,
			Pages:   (total + perPage - 1) / perPage,
		},
	})
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	var req models.CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid JSON"))
		return
	}

	status := req.Status
	if status == "" {
		status = "confirm"
	}

	var newID uint
	res, err := db.DB.Exec(
		`INSERT INTO users (username, first_name, last_name, email, phone, password_hash, role, branch, status, emp_id)
		 VALUES (?,?,?,?,?,?,?,?,?,?)`,
		req.Username, req.FirstName, req.LastName, req.Email, req.Phone,
		req.Password, req.Role, req.Branch, status, req.EmpID,
	)
	if err == nil {
		id, _ := res.LastInsertId()
		newID = uint(id)
	} else {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed to create user"))
		return
	}

	newUser := models.User{
		ID: newID, Username: req.Username, FirstName: req.FirstName,
		LastName: req.LastName, Email: req.Email, Phone: req.Phone,
		Role: req.Role, Branch: req.Branch, Status: status, EmpID: req.EmpID,
		CreatedAt: time.Now(),
	}
	writeJSON(w, http.StatusCreated, models.APIResponse{
		Success: true,
		Message: fmt.Sprintf("User '%s' created", req.Username),
		Data:    newUser,
	})
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	var req models.CreateUserRequest
	json.NewDecoder(r.Body).Decode(&req)

	_, err := db.DB.Exec(
		`UPDATE users SET first_name=COALESCE(NULLIF(?,''),first_name),
		 last_name=COALESCE(NULLIF(?,''),last_name), email=COALESCE(NULLIF(?,''),email),
		 phone=COALESCE(NULLIF(?,''),phone), role=COALESCE(NULLIF(?,''),role),
		 branch=COALESCE(NULLIF(?,''),branch), status=COALESCE(NULLIF(?,''),status)
		 WHERE id=?`,
		req.FirstName, req.LastName, req.Email, req.Phone, string(req.Role), req.Branch, req.Status, id,
	)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Update failed"))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "User updated"})
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	res, _ := db.DB.Exec(`DELETE FROM users WHERE id=?`, id)
	n, _ := res.RowsAffected()
	if n == 0 {
		writeJSON(w, http.StatusNotFound, apiErr("User not found"))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "User deleted"})
}

// ─── Valuations ──────────────────────────────────────────────────────────────

func pagination(r *http.Request) (int, int) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if perPage < 1 {
		perPage = 20
	}
	return page, perPage
}

func scanValuation(row interface {
	Scan(dest ...interface{}) error
}) models.Valuation {
	var v models.Valuation
	var createdAt, updatedAt *string
	err := row.Scan(
		&v.ID, &v.RegNo, &v.ChassisNo, &v.EngineNo, &v.Make, &v.Model,
		&v.YOM, &v.CountryOrigin, &v.CountryUsed, &v.EngineCapacity, &v.CurrentOwner, &v.FuelType, &v.BodyColor, &v.MeterReading, &v.MeterUnit,
		&v.SeatingCap, &v.Transmission, &v.GearboxCon, &v.EngineCon, &v.EngineStatus, &v.OverhaulDone,
		&v.BodyCon, &v.ChassisCon, &v.VehicleCon, &v.VehicleType, &v.BodyType, &v.ACCon,
		&v.AirType, &v.Steering, &v.SteeringCon, &v.FuelSystem, &v.DifferentialType, &v.DifferentialCon,
		&v.LightCon, &v.MeterCon, &v.AlternatorCon, &v.StarterType, &v.StarterCon, &v.ClutchType,
		&v.ClutchCon, &v.WiperType, &v.WiperCon, &v.ShaftType, &v.ShaftCon, &v.HornCon,
		&v.FootBrakeType, &v.FootBrakeCon, &v.ParkingBrakeCon, &v.SuspenFrType, &v.SuspenFrCon, &v.SuspenReType,
		&v.SuspenReCon, &v.PwShutterCon, &v.PwMirrorCon, &v.BodyMaint, &v.InterTrim,
		&v.TestType, &v.ComplienceEnvir, &v.TyreType, &v.WheelType, &v.TyreFrontType, &v.TyreFrMeterial,
		&v.TyreRearType, &v.TyreReMeterial, &v.FrSize, &v.FrWheel, &v.Fr1, &v.Fr2, &v.Fr3, &v.Fr4, &v.ReSize, &v.ReWheel, &v.Re1, &v.Re2, &v.Re3, &v.Re4, &v.Re5, &v.Re6, &v.Re7, &v.SpSize, &v.SpWheel, &v.Sp1, &v.Sp2, &v.FuelConsumption, &v.RoadTestDoneOn, &v.IfNotComments, &v.MarketValue,
		&v.ForcedValue, &v.ValAmount, &v.VAT, &v.Branch, &v.InspectionDate, &v.PINDate,
		&v.FinanceCompany, &v.FinanceBranch, &v.OpinionTo, &v.Yard, &v.InspectLocation, &v.TestComment, &v.SpecialFeature, &v.NeedRepair,
		&v.BodyRepair, &v.Accident, &v.ExtraOptions, &v.NeedWithinYear, &v.BodyPartsReplaced, &v.WriteOff,
		&v.Comments1, &v.MaintMechanical, &v.MaintMechanicalCon, &v.MaintBatteries, &v.SparesBodyParts, &v.SparesDoors,
		&v.SparesEngineParts, &v.SparesRoofType, &v.SparesAccessories, &v.GovPolicy, &v.EnvirReg, &v.Comments2,
		&v.ImagePaths[0], &v.ImagePaths[1], &v.ImagePaths[2], &v.ImagePaths[3], &v.ImagePaths[4], &v.Status,
		&v.CreatedBy, &createdAt, &updatedAt,
	)
	if err != nil {
		log.Println("Scan Error:", err)
	}
	if createdAt != nil {
		v.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", *createdAt)
	}
	if updatedAt != nil {
		v.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", *updatedAt)
	}
	return v
}

func GetValuations(w http.ResponseWriter, r *http.Request) {
	q := "%" + strings.ToLower(r.URL.Query().Get("q")) + "%"
	branch := r.URL.Query().Get("branch")
	status := r.URL.Query().Get("status")
	page, perPage := pagination(r)
	offset := (page - 1) * perPage

	args := []interface{}{q, q, q}
	where := `(LOWER(reg_no) LIKE ? OR LOWER(make) LIKE ? OR LOWER(model) LIKE ?)`

	if branch != "" {
		where += " AND LOWER(branch) = LOWER(?)"
		args = append(args, branch)
	}
	if status != "" {
		where += " AND LOWER(status) = LOWER(?)"
		args = append(args, status)
	}

	role := r.Header.Get("X-Role")
	if role != "admin" {
		userID := r.Header.Get("X-User-ID")
		where += " AND created_by = ?"
		args = append(args, userID)
	}

	var total int
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE `+where, args...).Scan(&total)

	args = append(args, perPage, offset)
	rows, err := db.DB.Query(
		`SELECT id, reg_no, chassis_no, engine_no, make, model, yom, country_origin, country_used, engine_capacity, current_owner, fuel_type, body_color, meter_reading, meter_unit, seating_cap, transmission, gearbox_con, engine_con, engine_status, overhaul_done, body_con, chassis_con, vehicle_con, vehicle_type, body_type, ac_con, air_type, steering, steering_con, fuel_system, differential_type, differential_con, light_con, meter_con, alternator_con, starter_type, starter_con, clutch_type, clutch_con, wiper_type, wiper_con, shaft_type, shaft_con, horn_con, foot_brake_type, foot_brake_con, parking_brake_con, suspen_fr_type, suspen_fr_con, suspen_re_type, suspen_re_con, pw_shutter_con, pw_mirror_con, body_maint, inter_trim, test_type, complience_envir, tyre_type, wheel_type, tyre_front_type, tyrefr_meterial, tyre_rear_type, tyrere_meterial,
			fr_size, fr_wheel, fr1, fr2, fr3, fr4, re_size, re_wheel, re1, re2, re3, re4, re5, re6, re7, sp_size, sp_wheel, sp1, sp2, fuel_consumption, road_test_done_on, if_not_comments, market_value, forced_value, val_amount, vat, branch, inspection_date, pin_date, finance_company, finance_branch, opinion_to, yard, inspect_location, test_comment, special_feature, need_repair, body_repair, accident, extra_options, need_within_year, body_parts_replaced, write_off, comments_1, maint_mechanical, maint_mechanical_con, maint_batteries, spares_body_parts, spares_doors, spares_engine_parts, spares_roof_type, spares_accessories, gov_policy, envir_reg, comments_2, image1, image2, image3, image4, image5, status, created_by, created_at, updated_at FROM valuations WHERE `+where+` ORDER BY id DESC LIMIT ? OFFSET ?`, args...)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("DB error"))
		return
	}
	defer rows.Close()

	valuations := []models.Valuation{}
	for rows.Next() {
		valuations = append(valuations, scanValuation(rows))
	}
	writeJSON(w, http.StatusOK, models.APIResponse{
		Success: true,
		Data: models.PaginatedResponse{
			Items:   valuations,
			Total:   total,
			Page:    page,
			PerPage: perPage,
			Pages:   (total + perPage - 1) / perPage,
		},
	})
}

func GetPendingValuations(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query(`SELECT id, reg_no, chassis_no, engine_no, make, model, yom, country_origin, country_used, engine_capacity, current_owner, fuel_type, body_color, meter_reading, meter_unit, seating_cap, transmission, gearbox_con, engine_con, engine_status, overhaul_done, body_con, chassis_con, vehicle_con, vehicle_type, body_type, ac_con, air_type, steering, steering_con, fuel_system, differential_type, differential_con, light_con, meter_con, alternator_con, starter_type, starter_con, clutch_type, clutch_con, wiper_type, wiper_con, shaft_type, shaft_con, horn_con, foot_brake_type, foot_brake_con, parking_brake_con, suspen_fr_type, suspen_fr_con, suspen_re_type, suspen_re_con, pw_shutter_con, pw_mirror_con, body_maint, inter_trim, test_type, complience_envir, tyre_type, wheel_type, tyre_front_type, tyrefr_meterial, tyre_rear_type, tyrere_meterial,
			fr_size, fr_wheel, fr1, fr2, fr3, fr4, re_size, re_wheel, re1, re2, re3, re4, re5, re6, re7, sp_size, sp_wheel, sp1, sp2, fuel_consumption, road_test_done_on, if_not_comments, market_value, forced_value, val_amount, vat, branch, inspection_date, pin_date, finance_company, finance_branch, opinion_to, yard, inspect_location, test_comment, special_feature, need_repair, body_repair, accident, extra_options, need_within_year, body_parts_replaced, write_off, comments_1, maint_mechanical, maint_mechanical_con, maint_batteries, spares_body_parts, spares_doors, spares_engine_parts, spares_roof_type, spares_accessories, gov_policy, envir_reg, comments_2, image1, image2, image3, image4, image5, status, created_by, created_at, updated_at FROM valuations WHERE status = 'Pending' ORDER BY id DESC`)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("DB error"))
		return
	}
	defer rows.Close()
	pending := []models.Valuation{}
	for rows.Next() {
		pending = append(pending, scanValuation(rows))
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Data: pending})
}

func CreateValuation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	var v models.Valuation
	json.NewDecoder(r.Body).Decode(&v)

	if userIDStr := r.Header.Get("X-User-ID"); userIDStr != "" {
		if id, err := strconv.Atoi(userIDStr); err == nil {
			v.CreatedBy = uint(id)
		}
	}

	res, err := db.DB.Exec(
		`INSERT INTO valuations (
			reg_no, chassis_no, engine_no, make, model, yom, country_origin, country_used, engine_capacity, current_owner,
			fuel_type, body_color, meter_reading, meter_unit, seating_cap, transmission, gearbox_con, engine_con, engine_status,
			overhaul_done, body_con, chassis_con, vehicle_con, vehicle_type, body_type, ac_con, air_type,
			steering, steering_con, fuel_system, differential_type, differential_con, light_con, meter_con, alternator_con,
			starter_type, starter_con, clutch_type, clutch_con, wiper_type, wiper_con, shaft_type, shaft_con,
			horn_con, foot_brake_type, foot_brake_con, parking_brake_con, suspen_fr_type, suspen_fr_con, suspen_re_type, suspen_re_con,
			pw_shutter_con, pw_mirror_con, body_maint, inter_trim, test_type, complience_envir, tyre_type,
			wheel_type, tyre_front_type, tyrefr_meterial, tyre_rear_type, tyrere_meterial,
			fr_size, fr_wheel, fr1, fr2, fr3, fr4, re_size, re_wheel, re1, re2, re3, re4, re5, re6, re7, sp_size, sp_wheel, sp1, sp2, fuel_consumption, road_test_done_on, if_not_comments,
			market_value, forced_value, val_amount, vat, branch, inspection_date, pin_date, finance_company,
			finance_branch, opinion_to, yard, inspect_location, test_comment, special_feature, need_repair, body_repair, accident, extra_options,
			need_within_year, body_parts_replaced, write_off, comments_1, maint_mechanical, maint_mechanical_con, maint_batteries, spares_body_parts,
			spares_doors, spares_engine_parts, spares_roof_type, spares_accessories, gov_policy, envir_reg, comments_2, image1,
			image2, image3, image4, image5, created_by
		) VALUES (
			?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
		)`,
		v.RegNo, v.ChassisNo, v.EngineNo, v.Make, v.Model, v.YOM, v.CurrentOwner, v.CountryOrigin, v.EngineCapacity, v.CurrentOwner,
		v.FuelType, v.BodyColor, v.MeterReading, v.MeterUnit, v.SeatingCap, v.Transmission, v.GearboxCon, v.EngineCon, v.EngineStatus,
		v.OverhaulDone, v.BodyCon, v.ChassisCon, v.VehicleCon, v.VehicleType, v.BodyType, v.ACCon, v.AirType,
		v.Steering, v.SteeringCon, v.FuelSystem, v.DifferentialType, v.DifferentialCon, v.LightCon, v.MeterCon, v.AlternatorCon,
		v.StarterType, v.StarterCon, v.ClutchType, v.ClutchCon, v.WiperType, v.WiperCon, v.ShaftType, v.ShaftCon,
		v.HornCon, v.FootBrakeType, v.FootBrakeCon, v.ParkingBrakeCon, v.SuspenFrType, v.SuspenFrCon, v.SuspenReType, v.SuspenReCon,
		v.PwShutterCon, v.PwMirrorCon, v.BodyMaint, v.InterTrim, v.TestType, v.ComplienceEnvir, v.TyreType,
		v.WheelType, v.TyreFrontType, v.TyreFrMeterial, v.TyreRearType, v.TyreReMeterial,
		v.FrSize, v.FrWheel, v.Fr1, v.Fr2, v.Fr3, v.Fr4, v.ReSize, v.ReWheel, v.Re1, v.Re2, v.Re3, v.Re4, v.Re5, v.Re6, v.Re7, v.SpSize, v.SpWheel, v.Sp1, v.Sp2, v.FuelConsumption, v.RoadTestDoneOn, v.IfNotComments,
		v.MarketValue, v.ForcedValue, v.ValAmount, v.VAT, v.Branch, v.InspectionDate, v.PINDate, v.FinanceCompany,
		v.FinanceBranch, v.OpinionTo, v.Yard, v.InspectLocation, v.TestComment, v.SpecialFeature, v.NeedRepair, v.BodyRepair, v.Accident, v.ExtraOptions,
		v.NeedWithinYear, v.BodyPartsReplaced, v.WriteOff, v.Comments1, v.MaintMechanical, v.MaintMechanicalCon, v.MaintBatteries, v.SparesBodyParts,
		v.SparesDoors, v.SparesEngineParts, v.SparesRoofType, v.SparesAccessories, v.GovPolicy, v.EnvirReg, v.Comments2, v.ImagePaths[0],
		v.ImagePaths[1], v.ImagePaths[2], v.ImagePaths[3], v.ImagePaths[4], v.CreatedBy,
	)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed: "+err.Error()))
		return
	}
	id, _ := res.LastInsertId()
	v.ID = uint(id)
	v.Status = "Pending"
	v.CreatedAt = time.Now()
	writeJSON(w, http.StatusCreated, models.APIResponse{Success: true, Data: v})
}

func UpdateValuation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	var v models.Valuation
	if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid JSON"))
		return
	}

	_, err := db.DB.Exec(
		`UPDATE valuations SET
			reg_no=?, chassis_no=?, engine_no=?, make=?, model=?, yom=?, current_owner=?,
			country_origin=?, country_used=?, engine_capacity=?, fuel_type=?, body_color=?, meter_reading=?, meter_unit=?, seating_cap=?,
			transmission=?, gearbox_con=?, engine_con=?, engine_status=?, overhaul_done=?, body_con=?,
			chassis_con=?, vehicle_con=?, vehicle_type=?, body_type=?, ac_con=?, air_type=?,
			steering=?, steering_con=?, fuel_system=?, differential_type=?, differential_con=?, light_con=?,
			meter_con=?, alternator_con=?, starter_type=?, starter_con=?, clutch_type=?, clutch_con=?,
			wiper_type=?, wiper_con=?, shaft_type=?, shaft_con=?, horn_con=?, foot_brake_type=?,
			foot_brake_con=?, parking_brake_con=?, suspen_fr_type=?, suspen_fr_con=?, suspen_re_type=?, suspen_re_con=?,
			pw_shutter_con=?, pw_mirror_con=?, body_maint=?, inter_trim=?, test_type=?,
			complience_envir=?, tyre_type=?, wheel_type=?, tyre_front_type=?, tyrefr_meterial=?, tyre_rear_type=?,
			tyrere_meterial=?, fr_size=?, fr_wheel=?, fr1=?, fr2=?, fr3=?, fr4=?, re_size=?, re_wheel=?, re1=?, re2=?, re3=?, re4=?, re5=?, re6=?, re7=?, sp_size=?, sp_wheel=?, sp1=?, sp2=?, fuel_consumption=?, road_test_done_on=?, if_not_comments=?, market_value=?, forced_value=?,
			val_amount=?, vat=?, branch=?, inspection_date=?, pin_date=?, finance_company=?,
			finance_branch=?, opinion_to=?, yard=?, inspect_location=?, test_comment=?, special_feature=?, need_repair=?, body_repair=?,
			accident=?, extra_options=?, need_within_year=?, body_parts_replaced=?, write_off=?, comments_1=?,
			maint_mechanical=?, maint_mechanical_con=?, maint_batteries=?, spares_body_parts=?, spares_doors=?, spares_engine_parts=?,
			spares_roof_type=?, spares_accessories=?, gov_policy=?, envir_reg=?, comments_2=?, updated_at=CURRENT_TIMESTAMP
		WHERE id=?`,
		v.RegNo, v.ChassisNo, v.EngineNo, v.Make, v.Model, v.YOM, v.CurrentOwner,
		v.CountryOrigin, v.CountryUsed, v.EngineCapacity, v.FuelType, v.BodyColor, v.MeterReading, v.MeterUnit, v.SeatingCap,
		v.Transmission, v.GearboxCon, v.EngineCon, v.EngineStatus, v.OverhaulDone, v.BodyCon,
		v.ChassisCon, v.VehicleCon, v.VehicleType, v.BodyType, v.ACCon, v.AirType,
		v.Steering, v.SteeringCon, v.FuelSystem, v.DifferentialType, v.DifferentialCon, v.LightCon,
		v.MeterCon, v.AlternatorCon, v.StarterType, v.StarterCon, v.ClutchType, v.ClutchCon,
		v.WiperType, v.WiperCon, v.ShaftType, v.ShaftCon, v.HornCon, v.FootBrakeType,
		v.FootBrakeCon, v.ParkingBrakeCon, v.SuspenFrType, v.SuspenFrCon, v.SuspenReType, v.SuspenReCon,
		v.PwShutterCon, v.PwMirrorCon, v.BodyMaint, v.InterTrim, v.TestType,
		v.ComplienceEnvir, v.TyreType, v.WheelType, v.TyreFrontType, v.TyreFrMeterial, v.TyreRearType,
		v.TyreReMeterial, v.FrSize, v.FrWheel, v.Fr1, v.Fr2, v.Fr3, v.Fr4, v.ReSize, v.ReWheel, v.Re1, v.Re2, v.Re3, v.Re4, v.Re5, v.Re6, v.Re7, v.SpSize, v.SpWheel, v.Sp1, v.Sp2, v.FuelConsumption, v.RoadTestDoneOn, v.IfNotComments, v.MarketValue, v.ForcedValue,
		v.ValAmount, v.VAT, v.Branch, v.InspectionDate, v.PINDate, v.FinanceCompany,
		v.FinanceBranch, v.OpinionTo, v.Yard, v.InspectLocation, v.TestComment, v.SpecialFeature, v.NeedRepair, v.BodyRepair,
		v.Accident, v.ExtraOptions, v.NeedWithinYear, v.BodyPartsReplaced, v.WriteOff, v.Comments1,
		v.MaintMechanical, v.MaintMechanicalCon, v.MaintBatteries, v.SparesBodyParts, v.SparesDoors, v.SparesEngineParts,
		v.SparesRoofType, v.SparesAccessories, v.GovPolicy, v.EnvirReg, v.Comments2, id)

	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed to update valuation: "+err.Error()))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Valuation updated"})
}

func GetFormOptions(w http.ResponseWriter, r *http.Request) {
	optType := r.URL.Query().Get("type")
	var rows *sql.Rows
	var err error

	if optType != "" {
		rows, err = db.DB.Query(
			`SELECT id, option_key, value, label, sort_order FROM form_options WHERE LOWER(option_key)=LOWER(?) ORDER BY sort_order`,
			optType)
	} else {
		rows, err = db.DB.Query(`SELECT id, option_key, value, label, sort_order FROM form_options ORDER BY option_key, sort_order`)
	}
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("DB error: "+err.Error()))
		return
	}
	defer rows.Close()

	result := []models.FormOption{}
	for rows.Next() {
		var o models.FormOption
		rows.Scan(&o.ID, &o.OptionType, &o.Value, &o.Label, &o.SortOrder)
		result = append(result, o)
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Data: result})
}

func CreateFormOption(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	var opt models.FormOption
	if err := json.NewDecoder(r.Body).Decode(&opt); err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid JSON"))
		return
	}
	if opt.OptionType == "" || opt.Value == "" {
		writeJSON(w, http.StatusBadRequest, apiErr("option_type and value are required"))
		return
	}
	if opt.Label == "" {
		opt.Label = opt.Value
	}
	res, err := db.DB.Exec(
		`INSERT INTO form_options (option_key, value, label, sort_order) VALUES (?,?,?,?)`,
		opt.OptionType, opt.Value, opt.Label, opt.SortOrder,
	)
	if err == nil {
		id, _ := res.LastInsertId()
	opt.ID = uint(id)
	}
	writeJSON(w, http.StatusCreated, models.APIResponse{Success: true, Data: opt})
}

func DeleteFormOption(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	res, err := db.DB.Exec(`DELETE FROM form_options WHERE id=?`, id)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Delete failed"))
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		writeJSON(w, http.StatusNotFound, apiErr("Option not found"))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Option deleted"})
}

func UpdateFormOption(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	var opt models.FormOption
	json.NewDecoder(r.Body).Decode(&opt)

	res, err := db.DB.Exec(
		`UPDATE form_options SET value=?, label=?, sort_order=? WHERE id=?`,
		opt.Value, opt.Label, opt.SortOrder, id,
	)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed to update option"))
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		writeJSON(w, http.StatusNotFound, apiErr("Option not found"))
		return
	}
	idInt, _ := strconv.Atoi(id)
	opt.ID = uint(idInt)
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Data: opt})
}

func GetStats(w http.ResponseWriter, r *http.Request) {
	var total, approved, pending, rejected int
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations`).Scan(&total)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE status='Approved'`).Scan(&approved)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE status='Pending'`).Scan(&pending)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE status='Rejected'`).Scan(&rejected)

	var todayCount, monthCount int
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE date(created_at) = date('now')`).Scan(&todayCount)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`).Scan(&monthCount)

	var userCount int
	db.DB.QueryRow(`SELECT COUNT(*) FROM users`).Scan(&userCount)

	userID := r.Header.Get("X-User-ID")
	branch := r.Header.Get("X-Branch")

	var uTotal, uToday, uMonth int
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE created_by=?`, userID).Scan(&uTotal)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE created_by=? AND date(created_at) = date('now')`, userID).Scan(&uToday)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE created_by=? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`, userID).Scan(&uMonth)

	var bTotal, bToday, bMonth, bUsers int
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE branch=?`, branch).Scan(&bTotal)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE branch=? AND date(created_at) = date('now')`, branch).Scan(&bToday)
	db.DB.QueryRow(`SELECT COUNT(*) FROM valuations WHERE branch=? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`, branch).Scan(&bMonth)
	db.DB.QueryRow(`SELECT COUNT(*) FROM users WHERE branch=?`, branch).Scan(&bUsers)

	writeJSON(w, http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"total_valuations":    total,
			"approved_valuations": approved,
			"pending_valuations":  pending,
			"rejected_valuations": rejected,
			"today_valuations":    todayCount,
			"monthly_valuations":  monthCount,
			"total_users":         userCount,
			"user_total":          uTotal,
			"user_today":          uToday,
			"user_monthly":        uMonth,
			"branch_total":        bTotal,
			"branch_today":        bToday,
			"branch_monthly":      bMonth,
			"branch_users":        bUsers,
		},
	})
}

func GetValuationByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)

	rows, err := db.DB.Query(
		`SELECT id, reg_no, chassis_no, engine_no, make, model, yom, country_origin, country_used, engine_capacity, current_owner, fuel_type, body_color, meter_reading, meter_unit, seating_cap, transmission, gearbox_con, engine_con, engine_status, overhaul_done, body_con, chassis_con, vehicle_con, vehicle_type, body_type, ac_con, air_type, steering, steering_con, fuel_system, differential_type, differential_con, light_con, meter_con, alternator_con, starter_type, starter_con, clutch_type, clutch_con, wiper_type, wiper_con, shaft_type, shaft_con, horn_con, foot_brake_type, foot_brake_con, parking_brake_con, suspen_fr_type, suspen_fr_con, suspen_re_type, suspen_re_con, pw_shutter_con, pw_mirror_con, body_maint, inter_trim, test_type, complience_envir, tyre_type, wheel_type, tyre_front_type, tyrefr_meterial, tyre_rear_type, tyrere_meterial,
			fr_size, fr_wheel, fr1, fr2, fr3, fr4, re_size, re_wheel, re1, re2, re3, re4, re5, re6, re7, sp_size, sp_wheel, sp1, sp2, fuel_consumption, road_test_done_on, if_not_comments, market_value, forced_value, val_amount, vat, branch, inspection_date, pin_date, finance_company, finance_branch, opinion_to, yard, inspect_location, test_comment, special_feature, need_repair, body_repair, accident, extra_options, need_within_year, body_parts_replaced, write_off, comments_1, maint_mechanical, maint_mechanical_con, maint_batteries, spares_body_parts, spares_doors, spares_engine_parts, spares_roof_type, spares_accessories, gov_policy, envir_reg, comments_2, image1, image2, image3, image4, image5, status, created_by, created_at, updated_at
		 FROM valuations WHERE id=?`, id)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("DB error: "+err.Error()))
		return
	}
	defer rows.Close()

	if rows.Next() {
		v := scanValuation(rows)
		writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Data: v})
		return
	}
	writeJSON(w, http.StatusNotFound, apiErr("Valuation not found"))
}

func UpdateValuationStatus(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch && r.Method != http.MethodPut {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	var req struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid JSON"))
		return
	}
	_, err := db.DB.Exec("UPDATE valuations SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?", req.Status, id)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed to update status"))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Status updated"})
}

func DeleteValuation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}
	id := extractID(r.URL.Path)
	_, err := db.DB.Exec("DELETE FROM valuations WHERE id=?", id)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Delete failed"))
		return
	}
	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Valuation deleted"})
}

func UploadValuationImages(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, apiErr("Method not allowed"))
		return
	}

	// URL: /api/valuations/{id}/images
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) < 2 {
		writeJSON(w, http.StatusBadRequest, apiErr("Invalid path"))
		return
	}
	id := parts[len(parts)-2]

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, apiErr("Failed to parse form"))
		return
	}

	valDir := filepath.Join(uploadsDir, "val_"+id)
	os.MkdirAll(valDir, 0755)

	var paths [5]string
	for i := 1; i <= 5; i++ {
		key := fmt.Sprintf("image%d", i)
		file, handler, err := r.FormFile(key)
		if err != nil {
			continue
		}
		defer file.Close()

		filename := fmt.Sprintf("img%d_%d%s", i, time.Now().UnixNano(), filepath.Ext(handler.Filename))
		dstPath := filepath.Join(valDir, filename)
		dst, err := os.Create(dstPath)
		if err != nil {
			continue
		}
		io.Copy(dst, file)
		dst.Close()

		paths[i-1] = "/uploads/val_" + id + "/" + filename
	}

	_, err = db.DB.Exec(
		`UPDATE valuations SET 
			image1=COALESCE(NULLIF(?,''), image1),
			image2=COALESCE(NULLIF(?,''), image2),
			image3=COALESCE(NULLIF(?,''), image3),
			image4=COALESCE(NULLIF(?,''), image4),
			image5=COALESCE(NULLIF(?,''), image5),
			updated_at=CURRENT_TIMESTAMP
		 WHERE id=?`,
		paths[0], paths[1], paths[2], paths[3], paths[4], id)

	if err != nil {
		writeJSON(w, http.StatusInternalServerError, apiErr("Failed to save image paths"))
		return
	}

	writeJSON(w, http.StatusOK, models.APIResponse{Success: true, Message: "Images uploaded"})
}

func extractID(path string) string {
	parts := strings.Split(path, "/")
	for i := len(parts) - 1; i >= 0; i-- {
		if parts[i] != "" && parts[i] != "images" && parts[i] != "status" {
			return parts[i]
		}
	}
	return ""
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func apiErr(msg string) models.APIResponse {
	return models.APIResponse{Success: false, Message: msg}
}
