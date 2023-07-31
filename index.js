const express = require('express');
require("./Database/connection");
const studentRouter = require("./Routers/student");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // recognize incoming request as JSON object(POST)

// Calling the router
app.use(studentRouter);

// Create JSON Web Token:
const createToken = async () => {
    const token = await jwt.sign({ _id: "64c5496ef177ed2cfc3cd59a" }, "islamislamislamislamislamislamislamislam", {
        expiresIn: "2 seconds"  // Not Mandetory
    });
    console.log(token);

    // Verify Token:
    const userVer = await jwt.verify(token, "islamislamislamislamislamislamislamislam");
    console.log(userVer); // Returns Id when token is correct
}

createToken();

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});