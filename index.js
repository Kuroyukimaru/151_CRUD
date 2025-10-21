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


app.post('/api/mahasiswa', (req, res) => {
    const {nama, alamat, agama} = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({message : "Nama, alamat, dan agama harus diiisi."});
    }

    db.query(
        "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)",
        [nama, alamat, agama],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({message: "Database Error"});
            }
            res.status(201).json({message: "User created successfully"});
        }
    );
});



app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const {nama, alamat, agama} = req.body;

    db.query(
        "UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?",
        [nama, alamat, agama, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database Error" });
            }
          
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: "User updated successfully" });
        }
    );
});

