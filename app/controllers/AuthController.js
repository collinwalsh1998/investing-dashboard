//import packages
import OAuth from "oauth-1.0a";
import crypto from "crypto";

class AuthController {
	constructor() {
		this.token = {
			key: process.env.BROKER_ONE_OAUTH_TOKEN,
			secret: process.env.BROKER_ONE_OAUTH_SECRET
		};

		this.oauth = OAuth({
			consumer: {
				key: process.env.BROKER_ONE_CONSUMER_KEY,
				secret: process.env.BROKER_ONE_CONSUMER_SECRET
			},
			signature_method: "HMAC-SHA1",
			hash_function: (baseString, key) => crypto.createHmac("sha1", key).update(baseString).digest("base64")
		});
	}

	generateRequestHeader(requestData) {
		return this.oauth.toHeader(this.oauth.authorize(requestData, this.token));
	}
}

export default AuthController;