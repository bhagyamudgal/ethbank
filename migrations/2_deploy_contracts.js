const Tether = artifacts.require("Tether");
const ERT = artifacts.require("ERT");
const Ethbank = artifacts.require("Ethbank");

module.exports = async function(deployer, network, accounts) {
	await deployer.deploy(Tether);
	const tether = await Tether.deployed();

	await deployer.deploy(ERT);
	const ert = await ERT.deployed();

	await deployer.deploy(Ethbank, ert.address, tether.address);
	const ethbank = await Ethbank.deployed();

	await ert.transfer(ethbank.address, "1000000000000000000000000");
};
