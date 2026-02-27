# 📖 Buku Panduan Pengguna
## Daily Report System v2.0

---

> **Untuk:** Seluruh Pengguna Aplikasi Daily Report
> **Versi Dokumen:** 1.0
> **Bahasa:** Bahasa Indonesia

---

## 📋 Daftar Isi

1. [Pengenalan Aplikasi](#1-pengenalan-aplikasi)
2. [Cara Login](#2-cara-login)
3. [Tampilan Dasar (Sidebar & Topbar)](#3-tampilan-dasar-sidebar--topbar)
4. [Panduan User Biasa](#4-panduan-user-biasa)
   - 4.1 [Dashboard User](#41-dashboard-user)
   - 4.2 [Membuat Laporan Harian](#42-membuat-laporan-harian)
   - 4.3 [Melihat & Mengedit Laporan](#43-melihat--mengedit-laporan)
   - 4.4 [Upload Lampiran Foto/Dokumen](#44-upload-lampiran-fotodokumen)
5. [Panduan Admin Divisi](#5-panduan-admin-divisi)
   - 5.1 [Dashboard Admin Divisi](#51-dashboard-admin-divisi)
   - 5.2 [Melihat & Mereview Laporan](#52-melihat--mereview-laporan)
   - 5.3 [Approve Laporan](#53-approve-laporan)
   - 5.4 [Kelola User Divisi](#54-kelola-user-divisi)
6. [Panduan Super Admin](#6-panduan-super-admin)
7. [Panduan Super Duper Admin (SDA)](#7-panduan-super-duper-admin-sda)
   - 7.1 [Dashboard Global](#71-dashboard-global)
   - 7.2 [Kelola Perusahaan](#72-kelola-perusahaan)
   - 7.3 [Kelola Divisi](#73-kelola-divisi)
   - 7.4 [Kelola User](#74-kelola-user)
   - 7.5 [Kelola Periode Laporan](#75-kelola-periode-laporan)
8. [Mode Direktur (Director Mode)](#8-mode-direktur-director-mode)
   - 8.1 [Login sebagai Direktur](#81-login-sebagai-direktur)
   - 8.2 [Membuat Laporan Eksklusif](#82-membuat-laporan-eksklusif)
   - 8.3 [Finalisasi & Approve Laporan Direktur](#83-finalisasi--approve-laporan-direktur)
9. [Export Laporan](#9-export-laporan)
10. [Notifikasi](#10-notifikasi)
11. [Pengaturan Tampilan (Dark/Light Mode)](#11-pengaturan-tampilan-darklight-mode)
12. [Pertanyaan Umum (FAQ)](#12-pertanyaan-umum-faq)

---

## 1. Pengenalan Aplikasi

**Daily Report System** adalah aplikasi digital untuk mencatat dan mengelola laporan aktivitas harian karyawan secara terstruktur. Sistem ini dirancang untuk:

- 📝 Memudahkan karyawan melaporkan kegiatan harian
- 👀 Memudahkan atasan memantau progress kerja tim
- 📊 Menyediakan data laporan yang terorganisir dan mudah di-export
- 🔒 Menjaga kerahasiaan laporan level direksi melalui Director Mode

### 👥 Siapa Pengguna Aplikasi Ini?

| Tipe Pengguna | Peran |
|---|---|
| **User (Karyawan)** | Membuat laporan harian, upload bukti foto/dokumen |
| **Admin Divisi** | Memantau dan approve laporan karyawan di divisinya |
| **Super Admin** | Mengelola semua divisi dalam satu perusahaan |
| **Super Duper Admin** | Mengelola semua perusahaan, divisi, dan pengguna |
| **Direktur** | Membuat laporan eksklusif lewat Director Mode |

---

## 2. Cara Login

### Login Standard (Karyawan & Admin)

1. Buka browser dan kunjungi alamat aplikasi (contoh: `http://localhost:3000`)
2. Halaman **Login Standard** akan muncul
3. Isi **Alamat Email** dan **Password** Anda
4. Klik tombol **"Masuk Sekarang"**

> 💡 Klik ikon **mata** (👁) di samping kolom password untuk menampilkan/menyembunyikan password

### Login Director Mode (Khusus Direktur)

1. Klik tombol **"Switch to Director Mode"** di bagian atas halaman login
2. Masukkan email dan password akun direktur Anda
3. Klik **"Masuk Sekarang"**

> ⚠️ **Akun Director berbeda** dengan akun standard. Hubungi administrator jika belum memiliki akun direktur.

### Lupa Password?

Hubungi **Admin** atau **Super Duper Admin** untuk reset password Anda.

---

## 3. Tampilan Dasar (Sidebar & Topbar)

Setelah login, Anda akan melihat tampilan utama dengan dua bagian penting:

### 🗂️ Sidebar (Panel Kiri)
Panel navigasi di sisi kiri layar berisi:
- **Logo & Nama Perusahaan** — di bagian atas
- **Nama & Role Anda** — ditampilkan dengan badge warna
- **Menu Navigasi** — sesuai dengan level akses Anda
- **Tombol Keluar (Logout)** — di bagian bawah sidebar

### 🔝 Topbar (Panel Atas)
Bar di bagian atas berisi:
- **Judul Halaman** — menunjukkan halaman yang sedang dibuka
- **Ikon Tema** ☀️/🌙 — untuk ganti mode terang/gelap
- **Ikon Lonceng** 🔔 — untuk melihat notifikasi
- **Nama Pengguna & Tombol Keluar**

> 📱 **Di layar handphone:** Sidebar akan tersembunyi. Ketuk ikon ≡ (tiga garis) untuk membuka sidebar.

---

## 4. Panduan User Biasa

### 4.1 Dashboard User

Setelah login sebagai **User**, Anda akan langsung melihat dashboard pribadi yang menampilkan:

- **Rekap Laporan Bulan Ini** — total laporan yang sudah dibuat
- **Status Laporan** — berapa yang Draft, Submitted, dan Approved
- **Daftar Laporan Terbaru** — riwayat laporan harian Anda

**Arti Status Laporan:**

| Status | Warna | Artinya |
|---|---|---|
| 🔘 **Draft** | Abu-abu | Laporan disimpan tapi belum dikirim ke atasan |
| 🟡 **Submitted** | Kuning | Laporan sudah dikirim, menunggu review atasan |
| 🟢 **Approved** | Hijau | Laporan sudah disetujui oleh atasan |

---

### 4.2 Membuat Laporan Harian

1. Klik menu **"Buat Laporan"** di sidebar

2. Isi formulir laporan:
   - **Tanggal** — otomatis terisi dengan tanggal hari ini
   - **Waktu** — otomatis terisi, bisa diedit jika perlu
   - **Deskripsi Aktivitas** — tuliskan kegiatan yang Anda lakukan hari ini *(wajib diisi)*
   - **Hambatan / Masalah** — jika ada kendala yang dihadapi *(opsional)*
   - **Solusi** — langkah yang dilakukan untuk mengatasi masalah *(opsional)*
   - **Hasil** — capaian atau output dari aktivitas hari ini *(opsional)*

3. **Upload Lampiran** (jika perlu):
   - Klik tombol input file lampiran
   - Pilih satu atau beberapa file (foto: JPG/PNG, atau dokumen: PDF/DOC)
   - Untuk memilih **beberapa file sekaligus**: tahan **Ctrl** dan klik file-file yang ingin diupload

4. **Pilih Status:**
   - **Draft** — simpan sebagai konsep dulu, belum dikirim ke atasan
   - **Submit** — langsung kirim ke atasan untuk direview

5. Klik **"Simpan Laporan"**

> ✅ Laporan berhasil disimpan jika muncul pesan sukses atau laporan muncul di daftar dashboard.

---

### 4.3 Melihat & Mengedit Laporan

**Melihat Detail Laporan:**
1. Dari dashboard atau daftar laporan, klik pada baris laporan yang ingin dilihat
2. Halaman detail laporan akan terbuka

**Mengedit Laporan:**
1. Buka detail laporan yang ingin diedit
2. Klik tombol **"Edit"** atau **"Edit Laporan"**
3. Ubah isian yang diperlukan
4. Klik **"Simpan"**

> ⚠️ **Catatan:** Laporan yang sudah berstatus **Approved** (disetujui atasan) **tidak bisa diedit** lagi.

**Menghapus Laporan:**
1. Di halaman detail laporan, klik tombol **"Hapus"** (ikon tempat sampah)
2. Konfirmasi penghapusan pada dialog yang muncul

> ⚠️ Laporan yang dihapus **tidak bisa dipulihkan**. File lampiran juga akan ikut terhapus.

---

### 4.4 Upload Lampiran Foto/Dokumen

Lampiran bisa berupa:
- 🖼️ **Foto** — format JPG atau PNG (bukti aktivitas, foto produk, dll)
- 📄 **Dokumen PDF** — laporan resmi, kontrak, dll.
- 📝 **Dokumen Word** — format DOC atau DOCX

**Cara Upload:**
1. Di form buat/edit laporan, temukan bagian **"Lampiran Dokumen"**
2. Klik tombol pilih file
3. Pilih file yang diinginkan dari komputer Anda
4. Untuk **multi-file**: tahan **Ctrl** dan pilih beberapa file sekaligus
5. Klik **"Simpan Laporan"**

**Cara Melihat Lampiran:**
- Di halaman detail laporan, klik pada thumbnail atau nama file lampiran
- File akan terbuka di tab baru browser

---

## 5. Panduan Admin Divisi

Sebagai **Admin Divisi**, Anda bisa memantau dan menyetujui laporan semua karyawan di divisi Anda.

### 5.1 Dashboard Admin Divisi

Dashboard menampilkan:
- **Karyawan yang Belum Lapor Hari Ini** — dengan notifikasi angka di menu
- **Rekap Laporan Divisi** — statistik keseluruhan
- **Daftar Laporan** — semua laporan dari karyawan divisi Anda

### 5.2 Melihat & Mereview Laporan

1. Dari dashboard, klik pada laporan yang ingin direview
2. Baca detail laporan: deskripsi aktivitas, hasil, lampiran, dll.
3. Anda bisa menulis **Catatan/Komentar** untuk karyawan tersebut

### 5.3 Approve Laporan

1. Buka laporan yang berstatus **"Submitted"**
2. Review isi laporan
3. Klik tombol **"Approve"** atau **"Setujui"**
4. Status laporan berubah menjadi **"Approved"** (hijau)
5. Karyawan akan mendapat notifikasi bahwa laporannya telah disetujui

> 💬 **Tips:** Anda juga bisa menambahkan catatan/review sebelum menyetujui laporan agar karyawan mendapat feedback.

### 5.4 Kelola User Divisi

1. Klik menu **"User Divisi"** di sidebar
2. Anda bisa melihat daftar semua karyawan di divisi Anda
3. Tersedia informasi: nama, email, status aktif, jumlah laporan

---

## 6. Panduan Super Admin

Sebagai **Super Admin**, Anda mengelola semua yang ada di satu perusahaan (PT) yang Anda kelola.

**Akses yang tersedia:**
- ✅ Lihat semua laporan dari semua divisi di perusahaan Anda
- ✅ Approve/review laporan lintas divisi
- ✅ Melihat statistik perusahaan
- ✅ Mengelola user di seluruh perusahaan Anda
- ✅ Export laporan ke Excel/PDF

**Yang TIDAK bisa dilakukan:**
- ❌ Mengakses data perusahaan lain
- ❌ Membuat perusahaan atau divisi baru (hanya SDA yang bisa)

---

## 7. Panduan Super Duper Admin (SDA)

**Super Duper Admin** adalah level tertinggi dengan akses penuh ke semua data dan konfigurasi sistem.

### 7.1 Dashboard Global

Dashboard SDA menampilkan:
- **Total semua perusahaan** terdaftar
- **Total seluruh karyawan** aktif
- **Total laporan** hari ini dari semua PT
- **Grafik statistik** tren laporan
- **Peringatan real-time** jika ada pengeluaran tinggi

### 7.2 Kelola Perusahaan

1. Klik menu **"Perusahaan"** di sidebar
2. **Tambah Perusahaan Baru:**
   - Klik tombol **"+ Tambah"**
   - Isi nama perusahaan, kode perusahaan, dan alamat
   - Klik **"Simpan"**
3. **Edit Perusahaan:** Klik ikon pensil ✏️ di baris perusahaan
4. **Nonaktifkan Perusahaan:** Klik tombol toggle aktif/nonaktif

### 7.3 Kelola Divisi

1. Klik menu **"Divisi"** di sidebar
2. **Tambah Divisi:**
   - Klik **"+ Tambah Divisi"**
   - Pilih perusahaan induk
   - Masukkan nama divisi
   - Klik **"Simpan"**
3. Divisi dapat diedit atau dinonaktifkan

### 7.4 Kelola User

1. Klik menu **"Kelola User"** di sidebar
2. Anda dapat:
   - **Tambah User Baru** — isi nama, email, password, role, perusahaan, divisi
   - **Edit User** — ubah data, role, atau divisi pengguna
   - **Reset Password** — atur ulang kata sandi pengguna
   - **Nonaktifkan User** — user tidak bisa login tapi data tersimpan
   - **Hapus Permanen (Deep Delete)** — menghapus user beserta **SELURUH** data laporannya

> ⚠️ **HATI-HATI:** **Deep Delete** menghapus user dan semua laporannya secara permanen dan tidak bisa dibatalkan!

**Role yang bisa dipilih saat tambah/edit user:**

| Role | Keterangan |
|---|---|
| `user` | Karyawan biasa |
| `admin_divisi` | Admin per divisi |
| `super_admin` | Admin perusahaan |
| `super_duper_admin` | Administrator global |

### 7.5 Kelola Periode Laporan

Periode laporan digunakan untuk mengatur rentang waktu dan deadline karyawan harus melaporkan kegiatannya.

1. Klik menu **"Periode"** di sidebar
2. **Tambah Periode:**
   - Klik **"+ Tambah Periode"**
   - Pilih perusahaan
   - Isi nama periode (contoh: "Februari 2026")
   - Atur tanggal mulai, tanggal akhir, dan **jam deadline**
   - Klik **"Simpan"**
3. Periode yang aktif akan digunakan sebagai acuan notifikasi laporan

---

## 8. Mode Direktur (Director Mode)

Director Mode adalah portal **eksklusif terpisah** untuk laporan level direksi. Data laporan di mode ini **tidak terlihat** oleh pengguna standard.

### 8.1 Login sebagai Direktur

1. Buka halaman login aplikasi
2. Klik tombol **"Switch to Director Mode"** (tombol kecil di atas form login)
3. Masukkan email dan password akun direktur Anda
4. Klik **"Masuk Sekarang"**

Setelah login Anda akan masuk ke **Executive Dashboard**.

### 8.2 Membuat Laporan Eksklusif

1. Klik menu **"Create Report"** di sidebar
2. Isi formulir:
   - **Tanggal & Waktu** — otomatis terisi
   - **Deskripsi Aktivitas / Keputusan** — uraian aktivitas atau keputusan strategis *(wajib)*
   - **Hasil / Target Dicapai** — capaian atau output
   - **Internal Notes / Issues** — catatan internal atau hambatan *(opsional)*
3. **Upload Lampiran:**
   - Klik tombol upload lampiran
   - Bisa pilih **beberapa file sekaligus** (foto, PDF, dokumen Word)
   - Tahan **Ctrl** untuk memilih lebih dari satu file
4. Pilih Status:
   - **Draft** — simpan sebagai konsep
   - **Finalize** — kirim dan kunci laporan
5. Klik **"Simpan Laporan"**

### 8.3 Finalisasi & Approve Laporan Direktur

**Finalisasi** laporan mengunci laporan agar tidak bisa diedit lagi.

1. Buka laporan yang sudah dibuat (status masih Draft/Submitted)
2. Klik tombol **"Finalize Report"**
3. Konfirmasi pada dialog yang muncul
4. Status berubah menjadi **"Approved"** dan laporan terkunci

**Menghapus Laporan Direktur:**
1. Di dashboard direktur, klik ikon **menu** (⋮) pada baris laporan
2. Pilih **"Delete Report"**
3. Konfirmasi penghapusan

---

## 9. Export Laporan

Anda dapat mengunduh laporan dalam format **Excel** atau **PDF**.

### Export ke Excel (.xlsx)

1. Klik menu **"Export Excel"** di sidebar (bagian Tools)
2. File Excel akan otomatis terunduh
3. File berisi semua data laporan sesuai akses role Anda

### Export ke PDF

1. Klik menu **"Export PDF"** di sidebar (bagian Tools)
2. File PDF akan otomatis terunduh
3. Format PDF cocok untuk dicetak atau dilampirkan ke email

> 💡 **Catatan:** Untuk **User biasa**, export hanya mencakup laporan milik sendiri. Untuk **Admin & SDA**, export mencakup laporan semua karyawan yang bisa diakses.

---

## 10. Notifikasi

Sistem notifikasi bekerja otomatis untuk beberapa kejadian penting:

| Notifikasi | Diterima Oleh |
|---|---|
| 🔴 **Belum lapor hari ini** | User belum membuat laporan |
| ✅ **Laporan disetujui** | User ketika laporannya di-approve admin |
| 💬 **Ada ulasan/komentar** | User ketika admin memberikan catatan |
| ⚠️ **Pengeluaran tinggi** | Super Duper Admin (pemantauan real-time) |

### Cara Melihat Notifikasi

1. Klik ikon **lonceng** 🔔 di pojok kanan atas (topbar)
2. Daftar notifikasi akan tampil dalam dropdown
3. Titik merah pada ikon lonceng menandakan ada notifikasi belum dibaca
4. Klik **"Baca Semua"** untuk tandai semua notifikasi sebagai sudah dibaca

---

## 11. Pengaturan Tampilan (Dark/Light Mode)

Aplikasi mendukung dua tema tampilan:

| Mode | Tampilan |
|---|---|
| 🌙 **Dark Mode** | Latar belakang gelap (default) — cocok untuk penggunaan malam |
| ☀️ **Light Mode** | Latar belakang terang — cocok untuk ruangan terang |

**Cara ganti tema:**
1. Klik ikon **matahari** ☀️ atau **bulan** 🌙 di topbar kanan atas
2. Tema langsung berubah dan tersimpan otomatis
3. Pilihan tema akan diingat oleh browser (tidak perlu diatur ulang saat login lagi)

---

## 12. Pertanyaan Umum (FAQ)

### ❓ Saya tidak bisa login, padahal password sudah benar
- Pastikan Capslock tidak aktif
- Coba tombol "Tampilkan Password" (ikon mata)
- Pastikan menggunakan email yang benar
- Hubungi admin jika masih tidak bisa

### ❓ Laporan saya tidak bisa diedit
- Laporan yang sudah berstatus **Approved** tidak bisa diedit
- Hubungi Admin Divisi Anda untuk membuka kunci laporan jika diperlukan

### ❓ Saya sudah upload foto tapi tidak muncul di laporan
- Pastikan file yang diupload berformat: JPG, PNG, PDF, DOC, atau DOCX
- Ukuran file terlalu besar bisa menyebabkan upload gagal
- Coba refresh halaman dan cek kembali

### ❓ Notifikasi tidak muncul meskipun ada laporan yang belum di-approve
- Coba klik ikon lonceng secara manual
- Refresh halaman browser (F5 atau Ctrl+R)

### ❓ Mau pilih beberapa file lampiran sekaligus tapi tidak bisa
- Saat dialog pilih file terbuka, tahan tombol **Ctrl** (Windows) atau **Cmd** (Mac) lalu klik file satu per satu
- Atau pilih semua file dengan Ctrl+A

### ❓ Halaman tampil abu-abu dan tidak bisa diklik
- Coba buka aplikasi di mode **Incognito/Private** (Ctrl+Shift+N)
- Itu bisa disebabkan oleh browser extension yang aktif
- Coba disable extension satu per satu untuk mencari penyebabnya
- Hard refresh: **Ctrl + Shift + R**

### ❓ Saya tidak bisa menemukan menu tertentu
- Tampilan menu tergantung **role** akun Anda
- Menu yang tidak relevan dengan role Anda tidak akan ditampilkan

### ❓ Bagaimana cara keluar (logout)?
- Klik tombol **"Keluar"** di bagian bawah sidebar
- Atau klik tombol **"Keluar"** di topbar kanan atas

---

## 📞 Bantuan & Kontak

Jika mengalami kendala yang tidak tercantum di panduan ini, hubungi:

- **Admin Divisi** — untuk masalah laporan dan approval
- **Super Admin** — untuk masalah akun dan akses
- **Super Duper Admin** — untuk masalah sistem dan konfigurasi

---

*📖 Daily Report System — Buku Panduan Pengguna v1.0*
*Dokumen ini dapat diperbarui seiring dengan pembaruan sistem.*
