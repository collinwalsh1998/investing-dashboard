//import controllers
import DataController from "../controllers/DataController.js";

export default function(app) {
	const dataController = new DataController();

	app.get("/getAccountData", (req, res) => dataController.getAccountData(req, res));
};