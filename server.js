const express = require('express');
const mariadb = require('mariadb');
const app = express();


const port = 3000;
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "2307",
    database: "conferenciajap2024",
    connectionLimit: 5
});

app.use(express.json());
app.use(express.static(__dirname));

app.post('/', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            `INSERT INTO conferencia(name, lastname, email, pais, ocupacion, interes) VALUE(?, ?, ?, ?, ?, ?)`,
            [req.body.nombre, req.body.apellido, req.body.email, req.body.pais, req.body.ocupacion, req.body.interes]);
        //res.json({ id: parseInt(response.insertId), ...req.body });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
})