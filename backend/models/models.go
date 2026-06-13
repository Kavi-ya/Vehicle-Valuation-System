package models

import (
	"time"
)

// ─── User ────────────────────────────────────────────────────────────────────

type Role string

const (
	RoleAdmin     Role = "admin"
	RoleValuer    Role = "valuer"
	RoleDataEntry Role = "dataentry"
)

type User struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone,omitempty"`
	Role      Role      `json:"role"`
	Branch    string    `json:"branch"`
	Status    string    `json:"status"` // "confirm" | "pending"
	EmpID     string    `json:"emp_id,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

type CreateUserRequest struct {
	Username        string `json:"username"`
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Email           string `json:"email"`
	Phone           string `json:"phone"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Role            Role   `json:"role"`
	Branch          string `json:"branch"`
	Status          string `json:"status"`
	EmpID           string `json:"emp_id"`

	// Permissions
	CanAdd         bool `json:"can_add"`
	CanEdit        bool `json:"can_edit"`
	CanApprove     bool `json:"can_approve"`
	CanDelete      bool `json:"can_delete"`
	CanViewReports bool `json:"can_view_reports"`
	CanManageUsers bool `json:"can_manage_users"`
}

// ─── Valuation ───────────────────────────────────────────────────────────────

type Valuation struct {
	ID              uint      `json:"id"`
	RegNo           string    `json:"reg_no"`
	ChassisNo       string    `json:"chassis_no"`
	EngineNo        string    `json:"engine_no"`
	Make            string    `json:"make"`
	Model           string    `json:"model"`
	YOM             int       `json:"yom"`
	CountryOrigin   string    `json:"country_origin"`
	CountryUsed     string    `json:"country_used"`
	EngineCapacity  string    `json:"engine_capacity"`
	FuelType        string    `json:"fuel_type"`
	BodyColor       string    `json:"body_color"`
	MeterReading    string    `json:"meter_reading"`
	MeterUnit       string    `json:"meter_unit"`
	SeatingCap      int       `json:"seating_cap"`
	CurrentOwner    string    `json:"current_owner"`
	Transmission    string    `json:"transmission"`
	GearboxCon      string    `json:"gearbox_con"`
	EngineCon       string    `json:"engine_con"`
	BodyCon         string    `json:"body_con"`
	VehicleCon      string    `json:"vehicle_con"`
	VehicleType     string    `json:"vehicle_type"`
	BodyType        string    `json:"body_type"`
	ACCon           string    `json:"ac_con"`
	AirType         string    `json:"air_type"`
	Steering        string    `json:"steering"`
	SteeringCon     string    `json:"steering_con"`
	FuelSystem      string    `json:"fuel_system"`

	DifferentialType string    `json:"differential_type"`
	DifferentialCon  string    `json:"differential_con"`
	LightCon         string    `json:"light_con"`
	MeterCon         string    `json:"meter_con"`
	AlternatorCon    string    `json:"alternator_con"`
	StarterType      string    `json:"starter_type"`
	StarterCon       string    `json:"starter_con"`
	ClutchType       string    `json:"clutch_type"`
	ClutchCon        string    `json:"clutch_con"`
	WiperType        string    `json:"wiper_type"`
	WiperCon         string    `json:"wiper_con"`
	ShaftType        string    `json:"shaft_type"`
	ShaftCon         string    `json:"shaft_con"`
	HornCon          string    `json:"horn_con"`
	FootBrakeType    string    `json:"foot_brake_type"`
	FootBrakeCon     string    `json:"foot_brake_con"`
	ParkingBrakeCon  string    `json:"parking_brake_con"`
	SuspenFrType     string    `json:"suspen_fr_type"`
	SuspenFrCon      string    `json:"suspen_fr_con"`
	SuspenReType     string    `json:"suspen_re_type"`
	SuspenReCon      string    `json:"suspen_re_con"`
	ChassisCon       string    `json:"chassis_con"`
	PwShutterCon     string    `json:"pw_shutter_con"`
	PwMirrorCon      string    `json:"pw_mirror_con"`
	BodyMaint        string    `json:"body_maint"`
	InterTrim        string    `json:"inter_trim"`
	TestType         string    `json:"test_type"`
	ComplienceEnvir  string    `json:"complience_envir"`
	EngineStatus     string    `json:"engine_status"`
	OverhaulDone     string    `json:"overhaul_done"`
	TyreType         string    `json:"tyre_type"`
	WheelType        string    `json:"wheel_type"`
	TyreFrontType    string    `json:"tyre_front_type"`
	TyreFrMeterial   string    `json:"tyrefr_meterial"`
	TyreRearType     string    `json:"tyre_rear_type"`
	TyreReMeterial   string    `json:"tyrere_meterial"`

	// Front Tyre Fields
	FrSize  string `json:"fr_size"`
	FrWheel string `json:"fr_wheel"`
	Fr1     string `json:"fr1"`
	Fr2     string `json:"fr2"`
	Fr3     string `json:"fr3"`
	Fr4     string `json:"fr4"`

	// Rear Tyre Fields
	ReSize  string `json:"re_size"`
	ReWheel string `json:"re_wheel"`
	Re1     string `json:"re1"`
	Re2     string `json:"re2"`
	Re3     string `json:"re3"`
	Re4     string `json:"re4"`
	Re5     string `json:"re5"`
	Re6     string `json:"re6"`
	Re7     string `json:"re7"`

	// Spare Tyre Fields
	SpSize  string `json:"sp_size"`
	SpWheel string `json:"sp_wheel"`
	Sp1     string `json:"sp1"`
	Sp2     string `json:"sp2"`

	FuelConsumption string    `json:"fuel_consumption"`
	RoadTestDoneOn  string    `json:"road_test_done_on"`
	IfNotComments   string    `json:"if_not_comments"`
	MarketValue     float64   `json:"market_value"`
	ForcedValue     float64   `json:"forced_value"`
	ValAmount       float64   `json:"val_amount"`
	VAT             bool      `json:"vat"`
	Branch          string    `json:"branch"`
	InspectionDate  string    `json:"inspection_date"`
	PINDate         string    `json:"pin_date"`
	FinanceCompany  string    `json:"finance_company"`
	FinanceBranch   string    `json:"finance_branch"`
	OpinionTo       string    `json:"opinion_to"`
	Yard            string    `json:"yard"`
	InspectLocation string    `json:"inspect_location"`
	TestComment     string    `json:"test_comment"`
	SpecialFeature  string    `json:"special_feature"`
	NeedRepair      string    `json:"need_repair"`
	BodyRepair      string    `json:"body_repair"`
	Accident        string    `json:"accident"`
	ExtraOptions    string    `json:"extra_options"`
	Status          string    `json:"status"` // approved | pending | rejected
	CreatedBy       uint      `json:"created_by"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`

	// New Fields
	NeedWithinYear    string `json:"need_within_year"`
	BodyPartsReplaced string `json:"body_parts_replaced"`
	WriteOff          string `json:"write_off"`
	Comments1         string `json:"comments_1"`
	MaintMechanical   string `json:"maint_mechanical"`
	MaintMechanicalCon string `json:"maint_mechanical_con"`
	MaintBody         string `json:"maint_body"`
	MaintBatteries    string `json:"maint_batteries"`
	MaintInternalTrim string `json:"maint_internal_trim"`
	MaintVehicleType  string `json:"maint_vehicle_type"`
	MaintExtra1       string `json:"maint_extra_1"`
	MaintExtra2       string `json:"maint_extra_2"`
	GovPolicy         string `json:"gov_policy"`
	EnvirReg          string `json:"envir_reg"`
	Comments2         string `json:"comments_2"`
	SparesBodyParts   string `json:"spares_body_parts"`
	SparesDoors       string `json:"spares_doors"`
	SparesEngineParts string `json:"spares_engine_parts"`
	SparesRoofType    string `json:"spares_roof_type"`
	SparesAccessories string `json:"spares_accessories"`
	SparesBody        string `json:"spares_body"`

	// Vehicle images — up to 5 file paths relative to /uploads/
	ImagePaths [5]string `json:"image_paths"`
}

// ─── FormOption ──────────────────────────────────────────────────────────────

type FormOption struct {
	ID         uint   `json:"id"`
	OptionType string `json:"option_type"`
	Value      string `json:"value"`
	Label      string `json:"label"`
	SortOrder  int    `json:"sort_order"`
}

// ─── Auth ────────────────────────────────────────────────────────────────────

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Role     Role   `json:"role"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

// ─── API Response ────────────────────────────────────────────────────────────

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Total   int         `json:"total,omitempty"`
}

type PaginatedResponse struct {
	Items   interface{} `json:"items"`
	Total   int         `json:"total"`
	Page    int         `json:"page"`
	PerPage int         `json:"per_page"`
	Pages   int         `json:"pages"`
}
