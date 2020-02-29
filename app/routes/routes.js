//import controllers
import DataController from "../controllers/DataController.js";

export default function(app) {
	const dataController = new DataController();

	app.get("/getAllAssets", (req, res) => dataController.getAllAssets(req, res));
};