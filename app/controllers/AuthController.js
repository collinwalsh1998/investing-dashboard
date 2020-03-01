//import packages
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import coinbase from "coinbase";

class AuthController {
	constructor() {
		this.token = {
			key: process.env.ALLY_OAUTH_TOKEN,
			secret: process.env.ALLY_OAUTH_SECRET
		};

		this.oauth = OAuth({
			consumer: {
				key: process.env.ALLY_CONSUMER_KEY,
				secret: process.env.ALLY_CONSUMER_SECRET
			},
			signature_method: "HMAC-SHA1",
			hash_function: (baseString, key) => crypto.createHmac("sha1", key).update(baseString).digest("base64")
		});
	}

	generateRequestHeader(requestData) {
		return this.oauth.toHeader(this.oauth.authorize(requestData, this.token));
	}

	getCoinbaseClient() {
		return new coinbase.Client({ "apiKey": process.env.COINBASE_API_KEY, "apiSecret": process.env.COINBASE_API_SECRET });
	}
}

export default AuthController;