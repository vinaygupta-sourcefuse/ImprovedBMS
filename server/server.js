const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const getData= () => {
    const data = fs.readFileSync("db.json");
    return JSON.parse(data).books;
}

// GET all data related to books
app.get("/api/books", (req, res) => {
    const data = getData();
    res.json(data);
});

// POST: Insert a new record
app.post("/api/books", (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json")); // Read full JSON object
    db.books.push(req.body); // Push new book into the books array
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2)); // Save updated data
    res.json(req.body);
});


// DELETE: Remove a record by ID
app.delete("/api/books/:isbn", (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json")); // Read full JSON object
    db.books = db.books.filter((book) => book.isbn != req.params.isbn); // Filter books
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2)); // Save updated data
    res.json({ message: "Book deleted", isbn: req.params.isbn });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});