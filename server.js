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

app.listen(PORT, () => 
    console.log(`Listening for requests on port ${PORT}`)
)