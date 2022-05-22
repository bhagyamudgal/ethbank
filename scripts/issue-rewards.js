const Ethbank = artifacts.require("Ethbank");

module.exports = async function issueRewards(callback) {
	let ethbank = await Ethbank.deployed();

	await ethbank.issueRewards();

	console.log("Rewards issued successfully");

	callback();
};
