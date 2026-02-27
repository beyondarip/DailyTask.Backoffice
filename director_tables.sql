-- ─── DIRECTOR MODE TABLES ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS director_roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO director_roles (role_name) 
SELECT 'super_admin' WHERE NOT EXISTS (SELECT 1 FROM director_roles WHERE role_name = 'super_admin');
INSERT INTO director_roles (role_name) 
SELECT 'super_duper_admin' WHERE NOT EXISTS (SELECT 1 FROM director_roles WHERE role_name = 'super_duper_admin');
INSERT INTO director_roles (role_name) 
SELECT 'user' WHERE NOT EXISTS (SELECT 1 FROM director_roles WHERE role_name = 'user');

CREATE TABLE IF NOT EXISTS director_positions (
  id SERIAL PRIMARY KEY,
  position_name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO director_positions (position_name) 
VALUES ('Director'), ('CEO'), ('CFO')
ON CONFLICT (position_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS director_users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES director_roles(id),
  position_id INTEGER REFERENCES director_positions(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS director_reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES director_users(id),
  report_date DATE NOT NULL,
  report_time TIME NOT NULL,
  task_description TEXT NOT NULL,
  issue TEXT,
  solution TEXT,
  result TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved')),
  manager_note TEXT,
  attachment_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS director_report_finance_detail (
  id SERIAL PRIMARY KEY,
  report_id INTEGER REFERENCES director_reports(id) ON DELETE CASCADE,
  item_name VARCHAR(255),
  qty INTEGER,
  unit_price DECIMAL(15, 2),
  total_price DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS director_notifications (
  id SERIAL PRIMARY KEY,
  recipient_user_id INTEGER REFERENCES director_users(id),
  sender_type VARCHAR(20) CHECK (sender_type IN ('system', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  type VARCHAR(50),
  reference_id INTEGER REFERENCES director_reports(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS director_audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES director_users(id),
  action VARCHAR(100),
  target_table VARCHAR(100),
  target_id INTEGER,
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS director_report_attachments (
  id SERIAL PRIMARY KEY,
  report_id INTEGER REFERENCES director_reports(id) ON DELETE CASCADE,
  attachment_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
