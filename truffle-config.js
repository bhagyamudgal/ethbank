require("babel-register");
require("babel-polyfill");

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: "7545",
			network_id: "*", // connect to any network
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
