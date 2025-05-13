const express = require("express")
const { getAllEmployees, getAllEmployeeById } = require("./controllers/index.js")
const app = express()
app.use(express.json())

app.get("/employees", async (req,res) => {
    let employees = await getAllEmployees()
    res.json({employees})
})

app.get("/employee/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    let employee = await getAllEmployeeById(id)
    res.json({employee})
})

module.exports = { app }

