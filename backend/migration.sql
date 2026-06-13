-- ============================================================
--  AW Associates – Vehicle Valuation System
--  PostgreSQL Migration v1
--  Run once:  psql -U postgres -d aw_associates -f migration.sql
-- ============================================================

-- Create database (run as superuser if needed)
-- CREATE DATABASE aw_associates;

-- ─── ENUM ───────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'valuer', 'dataentry');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── USERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(100) UNIQUE NOT NULL,
  first_name    VARCHAR(100) NOT NULL DEFAULT '',
  last_name     VARCHAR(100) NOT NULL DEFAULT '',
  email         VARCHAR(200) UNIQUE NOT NULL,
  phone         VARCHAR(30)  NOT NULL DEFAULT '',
  password_hash TEXT         NOT NULL,            -- store bcrypt hash in production
  role          user_role    NOT NULL DEFAULT 'dataentry',
  branch        VARCHAR(100) NOT NULL DEFAULT '',
  status        VARCHAR(20)  NOT NULL DEFAULT 'confirm', -- confirm | pending
  emp_id        VARCHAR(50)  NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed admin user (password = admin123 — CHANGE IN PRODUCTION)
INSERT INTO users (username, first_name, email, password_hash, role, branch, status)
VALUES ('admin', 'admin', 'admin@awassociates.lk', 'admin123', 'admin', 'Colombo', 'confirm')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, first_name, email, password_hash, role, branch, status)
VALUES ('admin2', 'admin2', 'admin2@awassociates.lk', 'admin123', 'dataentry', 'Colombo', 'confirm')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, first_name, email, password_hash, role, branch, status)
VALUES ('user', 'user', 'user@awassociates.lk', 'user123', 'valuer', 'Colombo', 'confirm')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, first_name, email, password_hash, role, branch, status)
VALUES ('testuser', 'testuser', 'testuser@awassociates.lk', 'user123', 'dataentry', 'BADULLA', 'confirm')
ON CONFLICT (username) DO NOTHING;

-- ─── VALUATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS valuations (
  id               SERIAL PRIMARY KEY,
  reg_no           VARCHAR(50)  NOT NULL,
  chassis_no       VARCHAR(100) NOT NULL DEFAULT '',
  engine_no        VARCHAR(100) NOT NULL DEFAULT '',
  make             VARCHAR(100) NOT NULL,
  model            VARCHAR(100) NOT NULL DEFAULT '',
  yom              SMALLINT     NOT NULL DEFAULT 0,
  country_origin   VARCHAR(100) NOT NULL DEFAULT '',
  engine_capacity  VARCHAR(50)  NOT NULL DEFAULT '',
  fuel_type        VARCHAR(50)  NOT NULL DEFAULT '',
  body_color       VARCHAR(50)  NOT NULL DEFAULT '',
  meter_reading    VARCHAR(50)  NOT NULL DEFAULT '',
  seating_cap      SMALLINT     NOT NULL DEFAULT 0,
  transmission     VARCHAR(50)  NOT NULL DEFAULT '',
  gearbox_con      VARCHAR(50)  NOT NULL DEFAULT '',
  engine_con       VARCHAR(50)  NOT NULL DEFAULT '',
  body_con         VARCHAR(50)  NOT NULL DEFAULT '',
  vehicle_con      VARCHAR(50)  NOT NULL DEFAULT '',
  vehicle_type     VARCHAR(50)  NOT NULL DEFAULT '',
  body_type        VARCHAR(50)  NOT NULL DEFAULT '',
  ac_con           VARCHAR(50)  NOT NULL DEFAULT '',
  air_type         VARCHAR(50)  NOT NULL DEFAULT '',
  steering         VARCHAR(50)  NOT NULL DEFAULT '',
  steering_con     VARCHAR(50)  NOT NULL DEFAULT '',
  fuel_system      VARCHAR(50)  NOT NULL DEFAULT '',
  fuel_consumption VARCHAR(50)  NOT NULL DEFAULT '',
  road_test_done_on VARCHAR(50)  NOT NULL DEFAULT '',
  if_not_comments  TEXT         NOT NULL DEFAULT '',
  market_value     NUMERIC(15,2) NOT NULL DEFAULT 0,
  forced_value     NUMERIC(15,2) NOT NULL DEFAULT 0,
  val_amount       NUMERIC(15,2) NOT NULL DEFAULT 0,
  travel_amount    NUMERIC(15,2) NOT NULL DEFAULT 0,
  rereport_amount  NUMERIC(15,2) NOT NULL DEFAULT 0,
  vat              BOOLEAN      NOT NULL DEFAULT FALSE,
  branch           VARCHAR(100) NOT NULL DEFAULT '',
  inspected_by     VARCHAR(100) NOT NULL DEFAULT '',
  inspection_date  VARCHAR(20)  NOT NULL DEFAULT '',
  pin_date         VARCHAR(20)  NOT NULL DEFAULT '',
  finance_company  VARCHAR(200) NOT NULL DEFAULT '',
  finance_branch   VARCHAR(100) NOT NULL DEFAULT '',
  opinion_to       VARCHAR(200) NOT NULL DEFAULT '',
  test_comment     TEXT         NOT NULL DEFAULT '',
  special_feature  TEXT         NOT NULL DEFAULT '',
  need_repair      TEXT         NOT NULL DEFAULT '',
  body_repair      TEXT         NOT NULL DEFAULT '',
  accident         TEXT         NOT NULL DEFAULT '',
  extra_options    TEXT         NOT NULL DEFAULT '',
  status           VARCHAR(30)  NOT NULL DEFAULT 'Pending',  -- Pending | Approved | Rejected
  vehicle_type_code VARCHAR(20) NOT NULL DEFAULT 'normal',   -- normal | 3wheel | motorcycle
  is_rereport      BOOLEAN      NOT NULL DEFAULT FALSE,
  customer_name    VARCHAR(200) NOT NULL DEFAULT '',
  customer_phone   VARCHAR(30)  NOT NULL DEFAULT '',
  created_by       INTEGER      NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- New Fields
  need_within_year TEXT NOT NULL DEFAULT '',
  body_parts_replaced TEXT NOT NULL DEFAULT '',
  write_off TEXT NOT NULL DEFAULT '',
  comments_1 TEXT NOT NULL DEFAULT '',
  maint_mechanical VARCHAR(50) NOT NULL DEFAULT '',
  maint_mechanical_con VARCHAR(50) NOT NULL DEFAULT '',
  maint_body VARCHAR(50) NOT NULL DEFAULT '',
  maint_batteries VARCHAR(50) NOT NULL DEFAULT '',
  maint_internal_trim VARCHAR(50) NOT NULL DEFAULT '',
  maint_vehicle_type VARCHAR(50) NOT NULL DEFAULT '',
  maint_extra_1 VARCHAR(50) NOT NULL DEFAULT '',
  maint_extra_2 VARCHAR(50) NOT NULL DEFAULT '',
  gov_policy VARCHAR(100) NOT NULL DEFAULT '',
  envir_reg VARCHAR(100) NOT NULL DEFAULT '',
  comments_2 TEXT NOT NULL DEFAULT '',
  spares_body_parts VARCHAR(50) NOT NULL DEFAULT '',
  spares_doors VARCHAR(50) NOT NULL DEFAULT '',
  spares_engine_parts VARCHAR(50) NOT NULL DEFAULT '',
  spares_roof_type VARCHAR(50) NOT NULL DEFAULT '',
  spares_accessories VARCHAR(50) NOT NULL DEFAULT '',
  spares_body VARCHAR(50) NOT NULL DEFAULT '',

  -- Up to 5 vehicle image paths (relative URL, e.g. /uploads/val_123/img1_xxx.jpg)
  -- Up to 5 vehicle image paths (relative URL, e.g. /uploads/val_123/img1_xxx.jpg)
  image1  TEXT NOT NULL DEFAULT '',
  image2  TEXT NOT NULL DEFAULT '',
  image3  TEXT NOT NULL DEFAULT '',
  image4  TEXT NOT NULL DEFAULT '',
  image5  TEXT NOT NULL DEFAULT '',

  -- Tyre Sizes and Wheels
  fr_size TEXT NOT NULL DEFAULT '',
  fr_wheel TEXT NOT NULL DEFAULT '',
  fr1 TEXT NOT NULL DEFAULT '',
  fr2 TEXT NOT NULL DEFAULT '',
  fr3 TEXT NOT NULL DEFAULT '',
  fr4 TEXT NOT NULL DEFAULT '',
  re_size TEXT NOT NULL DEFAULT '',
  re_wheel TEXT NOT NULL DEFAULT '',
  re1 TEXT NOT NULL DEFAULT '',
  re2 TEXT NOT NULL DEFAULT '',
  re3 TEXT NOT NULL DEFAULT '',
  re4 TEXT NOT NULL DEFAULT '',
  re5 TEXT NOT NULL DEFAULT '',
  re6 TEXT NOT NULL DEFAULT '',
  re7 TEXT NOT NULL DEFAULT '',
  sp_size TEXT NOT NULL DEFAULT '',
  sp_wheel TEXT NOT NULL DEFAULT '',
  sp1 TEXT NOT NULL DEFAULT '',
  sp2 TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_valuations_status ON valuations(status);
CREATE INDEX IF NOT EXISTS idx_valuations_branch ON valuations(branch);
CREATE INDEX IF NOT EXISTS idx_valuations_reg_no ON valuations(reg_no);

-- Seed sample valuations
INSERT INTO valuations (reg_no, chassis_no, engine_no, make, model, yom, market_value, branch, inspected_by, status)
VALUES
  ('WP BIA-5292','ME1RG44F5K0034274','G3L5E0095975','Yamaha','FZ-S VER 3.0',2019,1090000,'Monaragala','pac1','Approved'),
  ('WP PC-3407', 'VWE25181285',      'ZD30 147041K','Nissan','CARAVAN',       2007,10500000,'BADULLA','prasanna','Pending'),
  ('EP LL-6185', 'LVBV3JBB4DE242058','Q131075860C', 'Foton','BJ1047V3JB3-R', 2014,2000000,'KENDY','SILVESTER5','Approved'),
  ('NW KA-1231', 'JTMHV05J404057283','1VD0334832',  'Toyota','Land Cruiser 200',2016,42000000,'KENDY','SILVESTER5','Approved')
ON CONFLICT DO NOTHING;

-- ─── FORM OPTIONS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS form_options (
  id          SERIAL PRIMARY KEY,
  option_type VARCHAR(100) NOT NULL,
  value       VARCHAR(200) NOT NULL,
  sort_order  SMALLINT     NOT NULL DEFAULT 0,
  UNIQUE (option_type, value)
);

INSERT INTO form_options (option_type, value, sort_order) VALUES
  ('Transmission types', 'Auto',    1),
  ('Transmission types', 'Manual',  2),
  ('Fuel types',         'Petrol',  1),
  ('Fuel types',         'Diesel',  2),
  ('Fuel types',         'Electric',3),
  ('Fuel types',         'Hybrid',  4),
  ('Body type',          'Sedan',   1),
  ('Body type',          'Hatchback',2),
  ('Body type',          'SUV',     3),
  ('Body Color',         'White',   1),
  ('Body Color',         'Black',   2),
  ('Body Color',         'Silver',  3)
ON CONFLICT DO NOTHING;
