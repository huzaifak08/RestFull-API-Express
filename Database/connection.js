const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/restfull-api", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:false,
}).then(() => {
    console.log("MondoDB Connection is Successfull");
}).catch((e) => {
    console.log(`Got an Error: ${e.message}`);
});