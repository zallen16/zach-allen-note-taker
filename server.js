const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

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

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        console.log(req.body)
        const newNotes = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        console.log("newNotes", newNotes)
        const dbData = JSON.parse(data)
        dbData.push(newNotes)
        fs.writeFile("./db/db.json",JSON.stringify(dbData, null, "\t"), (writeErr) => {
            writeErr
                ? console.error(writeErr)
                : res.status(201).json(newNotes)
        });
        // res.json();
    })
    
})


app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.delete('/api/notes:id', (req, res) => {
    const id = req.params.id
    console.log("id", id)
    res.json(req.body)
})

app.listen(PORT, () => 
    console.log(`Listening for requests on port ${PORT}`)
)