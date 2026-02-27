-- ─── TABEL MASTER ───────────────────────────────────────────

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (role_name) VALUES 
('user'), 
('admin_divisi'), 
('super_admin'), 
('super_duper_admin');

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_code VARCHAR(50) UNIQUE NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE company_departments (
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
  PRIMARY KEY (company_id, department_id)
);

-- ─── TABEL USER ──────────────────────────────────────────────

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  position VARCHAR(255),
  company_id INTEGER REFERENCES companies(id),
  department_id INTEGER REFERENCES departments(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── TABEL LAPORAN ──────────────────────────────────────────

CREATE TABLE daily_report (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  report_date DATE NOT NULL,
  report_time TIME NOT NULL,
  task_description TEXT NOT NULL,
  issue TEXT,
  solution TEXT,
  result TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved')),
  manager_note TEXT,
  attachment_path VARCHAR(255),
  department_id INTEGER REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE daily_report_finance_detail (
  id SERIAL PRIMARY KEY,
  report_id INTEGER REFERENCES daily_report(id) ON DELETE CASCADE,
  item_name VARCHAR(255),
  qty INTEGER,
  unit_price DECIMAL(15, 2),
  total_price DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── TABEL PENDUKUNG ──────────────────────────────────────────

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  recipient_user_id INTEGER REFERENCES users(id),
  sender_type VARCHAR(20) CHECK (sender_type IN ('system', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  type VARCHAR(50) CHECK (type IN ('belum_lapor', 'laporan_diapprove', 'laporan_direview')),
  reference_id INTEGER REFERENCES daily_report(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE report_periods (
  id SERIAL PRIMARY KEY,
  period_name VARCHAR(100) NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  deadline TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100),
  target_table VARCHAR(100),
  target_id INTEGER,
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
