class DataParser {
	constructor() {}

	parseAllyAccountData(data) {
		return {
			accounts: data.response.accounts.accountsummary
		};
	}
}

export default DataParser;