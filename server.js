const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        console.log(data)
        const notes = JSON.parse(data)
        console.log(notes)
        res.json(notes)
    })
})

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => 
    console.log(`Listening for requests on port ${PORT}`)
)