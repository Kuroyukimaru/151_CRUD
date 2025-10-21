const express = require("express");
let mysql = require("mysql2");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.utlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Faradila15.',
    database: 'mahasiswa',
    port: 3309
});

db.connect ((err) => {
    if (err) {
        console.error('Error conection to the database:' + err.stack);
        return;
    }
    console.log('koneksi berhasil!');
});

app.get('api/mahasiswa', (req, res) => {
    db.query('SELECT * from biodata', (err,results) => {
        if(err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

