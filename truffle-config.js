require("babel-register");
require("babel-polyfill");
require("dotenv").config({ path: ".env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

const INFURA_API_KEY_URL = process.env.INFURA_API_KEY_URL;

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: "7545",
			network_id: "*", // connect to any network
		},

		rinkeby: {
			provider: () =>
				new HDWalletProvider({
					privateKeys: [RINKEBY_PRIVATE_KEY],

					providerOrUrl: INFURA_API_KEY_URL,
				}),
			network_id: 4,
		},
	},
	contracts_directory: "./contracts",
	contracts_build_directory: "./src/build/contracts",
	compilers: {
		solc: {
			version: "^0.5.13",
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
