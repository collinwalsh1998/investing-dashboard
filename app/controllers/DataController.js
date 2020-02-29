//import packages and controllers
import AuthController from "./AuthController.js";
import got from "got";

class DataController {
	constructor() {
		this.allyApiEndpoint = process.env.BROKER_ONE_API_ENDPOINT;
        this.authController = new AuthController();
	}

	async getAllyInvestData() {
        try {
            const requestUrl = this.allyApiEndpoint + "/accounts.json";

            let res = await got(requestUrl, {
                headers: this.authController.generateRequestHeader({ url: requestUrl, method: "GET" }),
                responseType: "json"
            });

            return res.body;
        } catch(err) {
            return err;
        }
    }

    getCoinbaseData() {

    }

    getAllAssets(req, res) {
        this.getAllyInvestData().then((data) => {
            res.status(200);
            res.json({ data: data });
            return;
        });
    }
}

export default DataController;