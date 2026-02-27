# 📊 Daily Report System — v2.0 Multi-Level

Aplikasi pelaporan harian terintegrasi berbasis web dengan sistem multi-perusahaan, multi-divisi, dan multi-level akses. Dilengkapi dengan **Director Mode** eksklusif untuk laporan level direksi.

---

## 🗂️ Daftar Isi

1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Cara Install](#cara-install)
3. [Konfigurasi Environment](#konfigurasi-environment)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Struktur Role & Akses](#struktur-role--akses)
6. [Fitur Utama](#fitur-utama)
7. [Struktur Folder](#struktur-folder)
8. [Noted untuk Developer](#-noted-untuk-developer)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Persyaratan Sistem

| Komponen | Versi Minimum | Keterangan |
|---|---|---|
| **Node.js** | v18.x atau lebih baru | [Download](https://nodejs.org) |
| **PostgreSQL** | v14.x atau lebih baru | [Download](https://www.postgresql.org) |
| **npm** | v9.x atau lebih baru | Sudah termasuk dengan Node.js |
| **OS** | Windows 10/11, Ubuntu 20.04+ | Direkomendasikan |

---

## 🚀 Cara Install

### Langkah 1 — Clone / Ekstrak Proyek

Jika menerima file zip, ekstrak ke folder yang diinginkan. Jika menggunakan git:

```bash
git clone <repo-url> DAILYTRACKER
cd DAILYTRACKER
```

### Langkah 2 — Install Dependencies

```bash
npm install
```

### Langkah 3 — Setup Database PostgreSQL

Buat database baru di PostgreSQL:

```sql
-- Jalankan di psql atau pgAdmin
CREATE DATABASE dailytracker;
```

### Langkah 4 — Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

Lalu isi file `.env` dengan detail koneksi database Anda (lihat [Konfigurasi Environment](#konfigurasi-environment)).

### Langkah 5 — Jalankan Migrasi Database

```bash
node migrate.js
```

Script ini akan membuat semua tabel standar (users, laporan, dll).

### Langkah 6 — Setup Tabel Director Mode

```bash
# Windows (PowerShell)
psql -U postgres -d dailytracker -f director_tables.sql

# Atau via pgAdmin: buka file director_tables.sql dan jalankan Query
```

### Langkah 7 — Jalankan Aplikasi

```bash
node app.js
```

Akses di browser: **http://localhost:3000**

---

## ⚙️ Konfigurasi Environment

Edit file `.env` sesuai konfigurasi server Anda:

```env
# ─── DATABASE ───────────────────────────
DB_USER=postgres           # Username PostgreSQL Anda
DB_PASSWORD=password123    # Password PostgreSQL Anda  
DB_HOST=localhost          # Host database (localhost jika lokal)
DB_NAME=dailytracker       # Nama database yang sudah dibuat
DB_PORT=5432               # Port PostgreSQL (default: 5432)

# ─── SESSION ────────────────────────────
SESSION_SECRET=ganti_ini_dengan_string_acak_panjang_minimal_32_karakter
```

> ⚠️ **PENTING:** Ganti `SESSION_SECRET` dengan string acak yang panjang dan unik. Jangan gunakan nilai default!

---

## ▶️ Menjalankan Aplikasi

### Mode Development (dengan auto-restart)

```bash
npm run dev
```

Membutuhkan `nodemon` (sudah termasuk di devDependencies).

### Mode Production

```bash
npm start
# atau
node app.js
```

### Perintah Lainnya

```bash
node migrate.js   # Jalankan migrasi database
node seed.js      # Isi data awal (opsional)
```

---

## 👥 Struktur Role & Akses

### Standard Mode (Login: `/login`)

| Role | Keterangan |
|---|---|
| **user** | Karyawan biasa — bisa buat & lihat laporan sendiri |
| **admin_divisi** | Admin per divisi — bisa approve laporan dalam divisinya |
| **super_admin** | Admin perusahaan — kelola semua divisi dalam 1 PT |
| **super_duper_admin** | Administrator global — akses penuh semua PT & data |

### Director Mode (Login: `/director/login`)

| Role | Keterangan |
|---|---|
| **user** (Director) | Direktur — buat laporan eksklusif |
| **super_duper_admin** (Director) | Kelola semua laporan & user direktur |

> ℹ️ Satu akun bisa memiliki akses ke **kedua mode** (standard & director) jika role-nya `super_duper_admin`.

---

## ✨ Fitur Utama

- **Multi-Tenant:** Mendukung banyak perusahaan (PT) dalam satu sistem
- **Multi-Level Access:** 4 level role dengan hak akses berbeda
- **Director Mode:** Portal eksklusif terpisah untuk laporan level direksi
- **Upload Lampiran:** Support foto (JPG/PNG) dan dokumen (PDF/DOC) — bisa multiple file
- **Export Data:** Export laporan ke Excel dan PDF
- **Notifikasi Real-time:** Pengingat laporan harian, notifikasi approval
- **Audit Log:** Semua aksi penting tercatat otomatis
- **Dark/Light Mode:** Toggle tema tampilan
- **Periode Laporan:** Kelola periode dan deadline laporan per perusahaan

---

## 📁 Struktur Folder

```
DAILYTRACKER/
├── app.js                    # Entry point — semua route & logic utama
├── migrate.js                # Script migrasi database (standard)
├── director_tables.sql       # SQL setup tabel Director Mode
├── seed.js                   # Data awal (opsional)
├── package.json              # Dependencies
├── .env                      # Konfigurasi environment (JANGAN di-commit!)
├── .env.example              # Template konfigurasi
│
├── middleware/               # Express middleware
│   └── audit.js              # Middleware audit log
│
├── views/                    # Template EJS (tampilan)
│   ├── login.ejs             # Halaman login (standard & director)
│   ├── partials/             # Layout komponen (sidebar, topbar, dll)
│   ├── admin/                # Tampilan admin
│   ├── director/             # Tampilan director mode
│   ├── sda/                  # Tampilan super duper admin
│   └── user/                 # Tampilan user biasa
│
├── public/                   # File statis
│   └── uploads/              # File upload lampiran laporan
│
└── archive/                  # Arsip file lama (tidak digunakan)
```

---

## 📝 Noted untuk Developer

### ⚠️ Hal-hal Penting yang Wajib Diketahui

1. **File Upload:**
   - File upload tersimpan di folder `public/uploads/`
   - Ketika laporan dihapus, file fisik di `uploads/` **otomatis terhapus** juga
   - Jika deploy ke server production, pastikan folder ini bisa ditulis (`chmod 777 public/uploads` di Linux)

2. **Database — Dua Skema:**
   - **Tabel Standard:** `users`, `daily_report`, `daily_report_attachments`, dll → dibuat via `node migrate.js`
   - **Tabel Director:** `director_users`, `director_reports`, `director_report_attachments`, dll → dibuat via `director_tables.sql`
   - Keduanya **wajib** disetup agar aplikasi berjalan normal

3. **Session & Cookie:**
   - Session disimpan di tabel `session` di PostgreSQL (via `connect-pg-simple`)
   - Tabel `session` dibuat **otomatis** saat pertama kali aplikasi dijalankan
   - `SESSION_SECRET` di `.env` wajib diisi — kalau kosong, session tidak aman

4. **Akun Super Duper Admin Pertama:**
   - Akun SDA pertama harus dibuat **manual** via psql atau pgAdmin:
   ```sql
   -- Generate hash password dulu via node (bcryptjs)
   -- Atau gunakan seed.js jika tersedia
   node seed.js
   ```

5. **Port Default:** Aplikasi berjalan di port **3000**. Untuk ganti port, edit di `app.js` baris terakhir:
   ```javascript
   app.listen(3000, ...)  // ganti 3000 ke port yang diinginkan
   ```

6. **Catatan Keamanan:**
   - Rate limiting aktif untuk endpoint login
   - File upload dibatasi tipe (JPG, PNG, PDF, DOC, DOCX)
   - Semua aksi sensitif dicatat di audit log
   - Jangan expose file `.env` ke publik!

7. **Tidak Perlu Restart Server untuk:**
   - Perubahan file `.ejs` (views) — langsung aktif
   
8. **Perlu Restart Server untuk:**
   - Perubahan file `app.js` atau file JavaScript lainnya
   - Perubahan file `.env`

---

## 🔧 Troubleshooting

### ❌ Error: `Cannot connect to database`
- Pastikan PostgreSQL sudah berjalan
- Cek isian `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` di `.env`
- Coba koneksi manual: `psql -U postgres -d dailytracker`

### ❌ Error: `relation "session" does not exist`
- Jalankan aplikasi sekali dan biarkan ia membuat tabel session otomatis
- Atau jalankan: `node migrate.js` terlebih dahulu

### ❌ Error: `relation "director_reports" does not exist`  
- Tabel Director belum dibuat. Jalankan:
```bash
psql -U postgres -d dailytracker -f director_tables.sql
```

### ❌ Upload file gagal / tidak tersimpan
- Pastikan folder `public/uploads/` ada dan bisa ditulis
- Di Linux: `mkdir -p public/uploads && chmod 755 public/uploads`

### ❌ Halaman tampil abu-abu / tidak bisa diklik
- Buka browser dalam mode **Incognito** (Ctrl+Shift+N)
- Jika normal di Incognito → kemungkinan ada **browser extension** yang interfere
- Hard refresh: `Ctrl + Shift + R`

### ❌ `MODULE_NOT_FOUND` saat `node app.js`
- Belum install dependencies. Jalankan: `npm install`

---

## 📞 Info Versi

| Item | Detail |
|---|---|
| **Versi** | 2.0.0 |
| **Tech Stack** | Node.js + Express + PostgreSQL + EJS |
| **Dibuat** | 2026 |
