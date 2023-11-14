const express = require('express');
const mariadb = require('mariadb');
const app = express();
const port = 3000;

const pool = mariadb.createPool({
    host: "localhost", 
    user: "root", 
    password: "2307", 
    database: "conferenciajap2024",  
    connectionLimit: 5});


app.get('/', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(
        `INSERT INTO conferencia(name, lastname, email, pais, ocupacion, interes) VALUE(?, ?, ?, ?, ?, ?)`,
        [req.body.name, req.body.lastname, req.body.email, req.body.pais, req.body.ocupacion, req.body.interes]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        res.json({id: res.insertId, ...req.body});
        
    } finally {
        if (conn) conn.release(); //release to pool
    }
})

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
})