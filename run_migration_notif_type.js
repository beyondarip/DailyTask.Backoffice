require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST, port: process.env.DB_PORT,
    database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
});
async function run() {
    const client = await pool.connect();
    try {
        // Update the CHECK constraint to allow 'urgent_solution'
        await client.query(`ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check`);
        await client.query(`ALTER TABLE notifications ADD CONSTRAINT notifications_type_check CHECK (type IN ('belum_lapor','laporan_diapprove','laporan_direview','high_value','urgent_solution'))`);
        console.log('✅ Constraint notifikasi diperbarui.');
    } catch (e) { console.error(e.message); }
    finally { client.release(); await pool.end(); }
}
run();
