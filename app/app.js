//import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//const dotenv = require("dotenv").config();

//env variables
const port = process.env.APP_PORT || 8085;
console.log(port);

//set express app options
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//import routes
//import routes from "./routes/routes.js";
//routes(app);
//require("./routes/routes")(app);

app.listen(port, () => {
	console.log(`Server host, port: ${port}`);
});