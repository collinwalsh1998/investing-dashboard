//import packages and controllers
import AuthController from "./AuthController.js";
import DataParser from "../utils/data-parser.js";
import got from "got";

class DataController {
	constructor() {
		this.allyApiEndpoint = process.env.BROKER_ONE_API_ENDPOINT;
        this.authController = new AuthController();
        this.dataParser = new DataParser();
	}

	async requestAllyInvestData() {
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

    requestAllySavingsData() {

    }

    requestCoinbaseData() {
        
    }

    async getAllAssets(req, res) {
        let allyInvestData = await this.requestAllyInvestData();
        allyInvestData = this.dataParser.parseAllyAccountData(allyInvestData);

        res.status(200);
        res.json({
            status: "success",
            response: allyInvestData
        });

        return;
    }
}

export default DataController;