import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

export const convertFromWei = (value) => {
	try {
		return web3.utils.fromWei(value, "Ether");
	} catch (error) {
		console.log("convertFromWei => ", { error });
		return "0";
	}
};

export const convertToWei = (value) => {
	try {
		return web3.utils.toWei(value, "Ether");
	} catch (error) {
		console.log("convertToWei => ", { error });
		return "0";
	}
};
