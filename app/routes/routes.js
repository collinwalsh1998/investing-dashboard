const DataController = require("../controllers/DataController");

export default function(app) {
    app.get("/getAllAssets", DataController.getAllAssets);
};