// import node modules
const express = require('express');
const logger = require('morgan');
const dotenv = require("dotenv");

// set config variables
dotenv.config({ path: "./config/.env" });

// create app with body parsing & logging
const app = express();
app.use(logger("dev"));
app.use(express.json());

// set port and listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
