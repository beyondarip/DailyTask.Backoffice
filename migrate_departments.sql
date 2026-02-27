-- ============================================================
-- MIGRATION: Simplify departments table
-- Hapus company_id, is_active, created_at dari tabel departments
-- Semua perusahaan berbagi master data divisi yang sama
-- ============================================================

BEGIN;

-- 1. Buat tabel departments baru yang sudah disederhanakan
CREATE TABLE departments_new (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) UNIQUE NOT NULL
);

-- 2. Masukkan nama-nama divisi unik dari tabel lama
INSERT INTO departments_new (department_name)
SELECT DISTINCT TRIM(department_name)
FROM departments
WHERE department_name IS NOT NULL AND department_name <> ''
ORDER BY TRIM(department_name);

-- 3. Buat mapping: department_id lama -> department_id baru
CREATE TEMP TABLE dept_id_map AS
SELECT
    old_d.id AS old_id,
    new_d.id AS new_id
FROM departments old_d
JOIN departments_new new_d ON TRIM(new_d.department_name) = TRIM(old_d.department_name);

-- 4. Update referensi di tabel users
UPDATE users u
SET department_id = m.new_id
FROM dept_id_map m
WHERE u.department_id = m.old_id;

-- 5. Update referensi di tabel daily_report
UPDATE daily_report dr
SET department_id = m.new_id
FROM dept_id_map m
WHERE dr.department_id = m.old_id;

-- 6. Hapus tabel lama dan rename tabel baru
-- (perlu drop constraint FK dulu, lalu recreate)
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_department_id_fkey;
ALTER TABLE daily_report DROP CONSTRAINT IF EXISTS daily_report_department_id_fkey;

DROP TABLE departments;
ALTER TABLE departments_new RENAME TO departments;

-- 7. Tambahkan kembali foreign key constraints
ALTER TABLE users
    ADD CONSTRAINT users_department_id_fkey
    FOREIGN KEY (department_id) REFERENCES departments(id);

ALTER TABLE daily_report
    ADD CONSTRAINT daily_report_department_id_fkey
    FOREIGN KEY (department_id) REFERENCES departments(id);

COMMIT;

-- Verifikasi hasil
SELECT * FROM departments ORDER BY department_name;
