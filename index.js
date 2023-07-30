const express = require('express');
require("./Database/connection");
const Student = require("./Models/student_model");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // recognize incoming request as JSON object(POST)

// Create a new Student Data:
/*
app.post("/students", (req, res) => {

    const stu = new Student(req.body); // Take the schema body from postman or frontend
    console.log(req.body);
    stu.save()  // Save the req.body data to MongoDB
        .then(() => {
            res.status(201).send(stu);
        }).catch((err) => {
            res.status(400).send(err.message);
        })

    // res.send('Hello from the other side');
}); */

// Now Create Student data using async/await:(Recommended)
app.post("/students", async (req, res) => {

    try {
        const stu = new Student(req.body);
        const createStu = await stu.save();

        res.status(201).send(createStu);

    } catch (err) {
        res.status(400).send(err);
    }

});

// Read the data of registered Students:
app.get("/students", async (req, res) => {
    try {
        const stusData = await Student.find();
        res.send(stusData);

    } catch (e) {
        res.send(e.message);
    }
});

// Read data of a single Student:
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const stuData = await Student.findById(_id);

        // Check if data is empty:
        if (!stuData) {
            return res.status(404).send();
        } else {
            res.send(stuData);
        }

    } catch (e) {
        res.status(500).send(e.message); // 500 : Server Error
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});