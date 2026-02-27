require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function run() {
    const client = await pool.connect();
    try {
        console.log('🔄 Memulai migrasi kolom director_solution...');

        // Cek apakah kolom sudah ada
        const check = await client.query(`
            SELECT column_name FROM information_schema.columns
            WHERE table_name='daily_report' AND column_name='director_solution'
        `);

        if (check.rows.length > 0) {
            console.log('✅ Kolom director_solution sudah ada.');
        } else {
            await client.query(`ALTER TABLE daily_report ADD COLUMN director_solution TEXT`);
            console.log('✅ Kolom director_solution berhasil ditambahkan.');
        }

    } catch (err) {
        console.error('\n❌ Error saat migrasi:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

run();
