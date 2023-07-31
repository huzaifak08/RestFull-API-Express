const express = require('express');
require("./Database/connection");
const Student = require("./Models/student_model");
const studentRouter = require("./Routers/student");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // recognize incoming request as JSON object(POST)

// Calling the router
app.use(studentRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});