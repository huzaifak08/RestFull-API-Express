const express = require('express');
const router = new express.Router();
const Student = require("../Models/student_model");

// Create a new Student Data:
/*
router.post("/students", (req, res) => {

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
router.post("/students", async (req, res) => {

    try {
        const stu = new Student(req.body);
        const createStu = await stu.save();

        res.status(201).send(createStu);

    } catch (err) {
        res.status(400).send(err);
    }

});

// Read the data of registered Students:
router.get("/students", async (req, res) => {
    try {
        const stusData = await Student.find();
        res.send(stusData);

    } catch (e) {
        res.send(e.message);
    }
});

// Read data of a single Student:
router.get("/students/:id", async (req, res) => {
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
});

// Delete student Data:
router.delete("/students/:id", async (req, res) => {
    try {

        const delStu = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(delStu);
        }

    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Update/Patch Student Data:
router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updStu = await Student.findByIdAndUpdate(_id, req.body, {
            new: true,
        });

        res.status(200).send(updStu);

    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;