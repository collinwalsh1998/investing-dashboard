//import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//environment variables
const port = process.env.APP_PORT || 8081;

//set express app options
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
import routes from "./routes/routes.js";
routes(app);

app.listen(port, () => {
	console.log(`\n\n\n\n\n Starting investing dashboard app - port: ${port}`);
});