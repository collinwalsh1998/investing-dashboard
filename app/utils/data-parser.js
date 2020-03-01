class DataParser {
	constructor() {}

	parseAllyAccountData(data) {
		return {
			accounts: data.response.accounts.accountsummary
		};
	}

	parseCoinbaseAccountData(data) {
		return {
			id: data.id,
			name: data.name,
			balance: data.balance,
			native_balance: data.native_balance,
			created_at: data.created_at,
			updated_at: data.updated_at
		};
	}
}

export default DataParser;