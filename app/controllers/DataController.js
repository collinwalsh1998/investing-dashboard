//import packages and controllers
import AuthController from "./AuthController.js";
import DataParser from "../utils/data-parser.js";
import coinbase from "coinbase";
import got from "got";

class DataController {
	constructor() {
        this.coinbaseWallets = [process.env.COINBASE_USD_WALLET, process.env.COINBASE_BTC_WALLET, process.env.COINBASE_ETH_WALLET];
        this.allyApiEndpoint = process.env.ALLY_API_ENDPOINT;

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

            return this.dataParser.parseAllyAccountData(res.body);
        } catch(err) {
            return err;
        }
    }

    requestAllySavingsData() {

    }

    async requestCoinbaseData() {
        return await new Promise((resolve, reject) => {
            try {
                const coinbaseClient = this.authController.getCoinbaseClient();

                coinbaseClient.getAccounts({}, (err, accounts) => {
                    let accountData = [];

                    accounts.forEach((account) => {
                        if(this.coinbaseWallets.includes(account.id)) {
                            accountData.push(this.dataParser.parseCoinbaseAccountData(account));
                        }
                    });

                    resolve(accountData);
                });
            } catch(err) {
                reject(err);
            }
        });
    }

    async getAllAssets(req, res) {
        let allyInvestData = await this.requestAllyInvestData();
        let coinbaseData = await this.requestCoinbaseData();

        res.status(200);
        res.json({
            status: "success",
            allyData: allyInvestData,
            coinbaseData: coinbaseData
        });

        return;
    }
}

export default DataController;