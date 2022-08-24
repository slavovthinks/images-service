const { Pool } = require('pg')

const DB_USER = process.env.DB_USER || 'admin'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DATABASE = process.env.DB_DATABASE || 'images_service'
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin123'
const DB_PORT = process.env.DB_PORT || '55432'

const IMAGES_TABLE = 'images'

const pool = new Pool(
    {
        user: DB_USER,
        host: DB_HOST,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        port: DB_PORT
    }
)

module.exports = {
    async query(text, params) {
        return await pool.query(text, params)
    },
    IMAGES_TABLE
}