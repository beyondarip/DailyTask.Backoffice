#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════╗
 * ║       DAILY REPORT SYSTEM — AUTO INSTALLER          ║
 * ║                  v2.0 Multi-Level                   ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Jalankan: node install.js
 * Script ini akan memandu setup lengkap aplikasi.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ── WARNA TERMINAL ───────────────────────────────────────
const C = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    white: '\x1b[37m',
};

const ok = (msg) => console.log(`${C.green}✅ ${msg}${C.reset}`);
const err = (msg) => console.log(`${C.red}❌ ${msg}${C.reset}`);
const info = (msg) => console.log(`${C.cyan}ℹ️  ${msg}${C.reset}`);
const warn = (msg) => console.log(`${C.yellow}⚠️  ${msg}${C.reset}`);
const step = (n, msg) => console.log(`\n${C.bright}${C.blue}[${n}]${C.reset}${C.bright} ${msg}${C.reset}`);
const line = () => console.log(`${C.white}${'─'.repeat(55)}${C.reset}`);

// ── READLINE HELPER ──────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, def = '') => new Promise(resolve => {
    const hint = def ? ` (default: ${def})` : '';
    rl.question(`${C.cyan}  ❓ ${q}${hint}: ${C.reset}`, (ans) => resolve(ans.trim() || def));
});
const askSecret = (q) => new Promise(resolve => {
    process.stdout.write(`${C.cyan}  🔒 ${q}: ${C.reset}`);
    const stdin = process.openStdin();
    process.stdin.setRawMode && process.stdin.setRawMode(true);
    let pw = '';
    process.stdin.on('data', function handler(ch) {
        ch = ch.toString('utf8');
        if (ch === '\n' || ch === '\r' || ch === '\u0004') {
            process.stdin.setRawMode && process.stdin.setRawMode(false);
            process.stdin.removeListener('data', handler);
            process.stdin.pause();
            process.stdout.write('\n');
            resolve(pw);
        } else if (ch === '\u0003') {
            process.exit();
        } else if (ch === '\u007f') {
            if (pw.length > 0) { pw = pw.slice(0, -1); process.stdout.write('\b \b'); }
        } else {
            pw += ch;
            process.stdout.write('*');
        }
    });
    process.stdin.resume();
});

// ── GENERATE RANDOM SECRET ───────────────────────────────
function generateSecret(len = 48) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// ── CEK NODE VERSION ─────────────────────────────────────
function checkNodeVersion() {
    const [major] = process.versions.node.split('.').map(Number);
    if (major < 18) {
        err(`Node.js versi ${process.versions.node} terlalu lama. Minimal v18.`);
        process.exit(1);
    }
    ok(`Node.js v${process.versions.node}`);
}

// ── CEK FILE ADA ─────────────────────────────────────────
function checkFile(filePath, label) {
    if (fs.existsSync(filePath)) {
        ok(`${label} ditemukan`);
        return true;
    }
    err(`${label} TIDAK ditemukan: ${filePath}`);
    return false;
}

// ── BUAT FOLDER ──────────────────────────────────────────
function ensureDir(dirPath, label) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        ok(`Folder ${label} dibuat`);
    } else {
        ok(`Folder ${label} sudah ada`);
    }
}

// ── MAIN INSTALLER ───────────────────────────────────────
async function main() {
    console.clear();
    console.log(`
${C.bright}${C.magenta}╔══════════════════════════════════════════════════════╗
║       📊 DAILY REPORT SYSTEM — AUTO INSTALLER       ║
║                    v2.0 Multi-Level                  ║
╚══════════════════════════════════════════════════════╝${C.reset}
`);
    console.log(`${C.yellow}  Script ini akan membantu Anda setup aplikasi dari awal.${C.reset}`);
    console.log(`${C.yellow}  Pastikan PostgreSQL sudah terinstall dan berjalan.${C.reset}\n`);
    line();

    // ── STEP 1: CEK PERSYARATAN ───────────────────────────
    step('1', 'Memeriksa Persyaratan Sistem...');
    checkNodeVersion();

    // Cek file penting
    const requiredFiles = [
        ['app.js', 'File utama app.js'],
        ['init_db.sql', 'File database init_db.sql'],
        ['director_tables.sql', 'SQL Director Mode'],
        ['package.json', 'package.json'],
    ];
    let allOk = true;
    for (const [f, label] of requiredFiles) {
        if (!checkFile(path.join(__dirname, f), label)) allOk = false;
    }
    if (!allOk) {
        err('Ada file penting yang hilang. Pastikan semua file proyek ada.');
        process.exit(1);
    }

    // ── STEP 2: NPM INSTALL ───────────────────────────────
    step('2', 'Install Dependencies (npm install)...');
    if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
        warn('node_modules sudah ada. Melewati npm install.');
        const reinstall = await ask('Install ulang dependencies? (y/n)', 'n');
        if (reinstall.toLowerCase() === 'y') {
            info('Menjalankan npm install...');
            execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        }
    } else {
        info('Menjalankan npm install...');
        execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        ok('Dependencies berhasil diinstall!');
    }

    // ── STEP 3: SETUP .ENV ────────────────────────────────
    step('3', 'Konfigurasi File .env...');
    const envPath = path.join(__dirname, '.env');

    if (fs.existsSync(envPath)) {
        warn('File .env sudah ada.');
        const overwrite = await ask('Timpa .env yang ada? (y/n)', 'n');
        if (overwrite.toLowerCase() !== 'y') {
            ok('Menggunakan .env yang sudah ada.');
        } else {
            await setupEnv(envPath);
        }
    } else {
        await setupEnv(envPath);
    }

    // Load .env setelah dibuat
    require('dotenv').config({ path: envPath });

    // ── STEP 4: CEK KONEKSI DATABASE ──────────────────────
    step('4', 'Memeriksa Koneksi Database...');
    const { Pool } = require('pg');
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        const client = await pool.connect();
        ok(`Terhubung ke PostgreSQL (${process.env.DB_HOST}:${process.env.DB_PORT})`);
        ok(`Database: ${process.env.DB_NAME}`);
        client.release();
    } catch (e) {
        err(`Gagal terhubung ke database: ${e.message}`);
        warn('Pastikan PostgreSQL berjalan dan setting .env sudah benar.');
        warn('Coba jalankan ulang: node install.js');
        await pool.end();
        process.exit(1);
    }

    // ── STEP 5: MIGRASI DATABASE STANDARD ────────────────
    step('5', 'Migrasi Database Standard (init_db.sql)...');
    info('Membuat tabel: users, daily_report, departments, companies, dll...');
    try {
        const sqlInit = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');
        const clientInit = await pool.connect();
        await clientInit.query(sqlInit);
        clientInit.release();
        ok('Database standard berhasil diinisialisasi!');
    } catch (e) {
        err('Gagal inisialisasi database standard: ' + e.message);
        process.exit(1);
    }

    // ── STEP 6: SETUP TABEL DIRECTOR ─────────────────────
    step('6', 'Setup Tabel Director Mode...');
    info('Membuat tabel: director_users, director_reports, director_report_attachments, dll...');
    try {
        const sqlContent = fs.readFileSync(path.join(__dirname, 'director_tables.sql'), 'utf8');
        const { Pool: Pool2 } = require('pg');
        const pool2 = new Pool2({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
        const client2 = await pool2.connect();
        await client2.query(sqlContent);
        client2.release();
        await pool2.end();
        ok('Tabel Director Mode berhasil dibuat!');
    } catch (e) {
        err('Gagal membuat tabel director: ' + e.message);
        warn('Coba jalankan manual: psql -U postgres -d ' + process.env.DB_NAME + ' -f director_tables.sql');
    }

    // ── STEP 7: BUAT FOLDER ───────────────────────────────
    step('7', 'Mempersiapkan Folder...');
    ensureDir(path.join(__dirname, 'public', 'uploads'), 'public/uploads');

    // ── STEP 8: SEED DATA (OPSIONAL) ─────────────────────
    step('8', 'Data Awal (Opsional)...');
    if (fs.existsSync(path.join(__dirname, 'seed.js'))) {
        const doSeed = await ask('Jalankan seed data awal? (y/n)', 'n');
        if (doSeed.toLowerCase() === 'y') {
            try {
                execSync('node seed.js', { stdio: 'inherit', cwd: __dirname });
                ok('Seed data berhasil!');
            } catch (e) {
                warn('Seed gagal: ' + e.message);
            }
        } else {
            info('Melewati seed data.');
        }
    }

    // ── SELESAI ───────────────────────────────────────────
    await pool.end();
    rl.close();

    console.log(`\n${C.bright}${C.green}`);
    line();
    console.log('  🎉 INSTALASI SELESAI!');
    line();
    console.log(`${C.reset}`);
    console.log(`${C.green}  Aplikasi siap dijalankan!${C.reset}\n`);
    console.log(`${C.cyan}  Cara menjalankan:${C.reset}`);
    console.log(`${C.white}    node app.js${C.reset}         ${C.yellow}# Production${C.reset}`);
    console.log(`${C.white}    npm run dev${C.reset}          ${C.yellow}# Development (auto-restart)${C.reset}`);
    console.log(`\n${C.cyan}  Akses di browser:${C.reset}`);
    console.log(`${C.white}    http://localhost:3000${C.reset}             ${C.yellow}# Standard Mode${C.reset}`);
    console.log(`${C.white}    http://localhost:3000/director/login${C.reset} ${C.yellow}# Director Mode${C.reset}`);

    console.log(`\n${C.magenta}  🐧 TIPS LINUX SERVER:${C.reset}`);
    console.log(`${C.white}    Pastikan izin folder upload sudah diset:${C.reset}`);
    console.log(`${C.yellow}    chmod -R 775 public/uploads${C.reset}`);
    console.log(`${C.white}    Jika menggunakan Nginx, jangan lupa trust proxy sudah aktif di app.js.${C.reset}`);
    console.log('');
}

// ── SETUP .ENV HELPER ────────────────────────────────────
async function setupEnv(envPath) {
    console.log(`\n  ${C.yellow}Masukkan konfigurasi database PostgreSQL Anda:${C.reset}\n`);
    const dbHost = await ask('DB_HOST (alamat server database)', 'localhost');
    const dbPort = await ask('DB_PORT', '5432');
    const dbName = await ask('DB_NAME (nama database)', 'dailytracker');
    const dbUser = await ask('DB_USER (username PostgreSQL)', 'postgres');
    const dbPass = await ask('DB_PASSWORD (password PostgreSQL)');
    const secret = generateSecret();

    const envContent = `# ─── DATABASE ───────────────────────────────────────
DB_USER=${dbUser}
DB_PASSWORD=${dbPass}
DB_HOST=${dbHost}
DB_NAME=${dbName}
DB_PORT=${dbPort}

# ─── SESSION ─────────────────────────────────────────
# JANGAN UBAH INI SETELAH PRODUCTION!
SESSION_SECRET=${secret}
`;

    fs.writeFileSync(envPath, envContent);
    ok('.env berhasil dibuat!');
    info(`SESSION_SECRET otomatis digenerate: ${secret.substring(0, 16)}...`);
}

// ── HANDLE EXIT ──────────────────────────────────────────
process.on('SIGINT', () => {
    console.log('\n\nInstalasi dibatalkan.');
    process.exit(0);
});

main().catch(e => {
    err('Terjadi kesalahan tidak terduga: ' + e.message);
    console.error(e);
    process.exit(1);
});
