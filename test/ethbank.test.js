const Tether = artifacts.require("Tether");
const ERT = artifacts.require("ERT");
const Ethbank = artifacts.require("Ethbank");

require("chai")
	.use(require("chai-as-promised"))
	.should();

contract("ethbank", ([owner, investor]) => {
	let tether, ert, ethbank;

	const tokens = (value) => {
		return web3.utils.toWei(value);
	};

	before(async () => {
		// load contracts
		tether = await Tether.new();
		ert = await ERT.new();
		ethbank = await Ethbank.new(ert.address, tether.address);

		await ert.transfer(ethbank.address, tokens("1000000"));
		await tether.transfer(investor, tokens("400"), {
			from: owner,
		});
	});

	describe("Mock Tether Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await tether.name();
			assert.equal(name, "Mock Tether Token");
		});
	});

	describe("ERT Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await ert.name();
			assert.equal(name, "Ethbank Reward Token");
		});
	});

	describe("Ethbank Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await ethbank.name();
			assert.equal(name, "Ethbank");
		});

		it("contract has tokens", async () => {
			const balance = await ert.balanceOf(ethbank.address);
			assert.equal(balance, tokens("1000000"));
		});
	});

	describe("Airdrop", async () => {
		it("matches name successfully", async () => {
			let result;

			result = await tether.balanceOf(investor);
			assert.equal(
				result.toString(),
				tokens("400"),
				"investor mock tether balance before airdrop"
			);

			await tether.airdrop({
				from: investor,
			});

			result = await tether.balanceOf(investor);
			assert.equal(
				result.toString(),
				tokens("500"),
				"investor mock tether balance after airdrop"
			);
		});
	});

	describe("Yield Farming", async () => {
		it("stake tokens", async () => {
			let result;

			result = await tether.balanceOf(investor);
			assert.equal(
				result.toString(),
				tokens("500"),
				"investor mock tether balance before staking"
			);

			await tether.approve(ethbank.address, tokens("100"), {
				from: investor,
			});

			await ethbank.depositTokens(tokens("100"), { from: investor });

			result = await tether.balanceOf(investor);
			assert.equal(
				result.toString(),
				tokens("400"),
				"investor mock tether balance after staking"
			);

			result = await tether.balanceOf(ethbank.address);
			assert.equal(
				result.toString(),
				tokens("100"),
				"ethbank mock tether balance after staking"
			);

			result = await ethbank.isStaking(investor);
			assert.equal(
				result.toString(),
				"true",
				"investor is staking status after staking"
			);
		});

		it("rewards token for staking tokens", async () => {
			let result;

			await ethbank.issueRewards({ from: owner });

			await ethbank.issueRewards({ from: investor }).should.be.rejected;
		});

		it("unstake tokens", async () => {
			let result;

			await ethbank.unstakeTokens({ from: investor });

			result = await tether.balanceOf(investor);
			assert.equal(
				result.toString(),
				tokens("500"),
				"investor mock tether balance after un staking"
			);

			result = await tether.balanceOf(ethbank.address);
			assert.equal(
				result.toString(),
				tokens("0"),
				"ethbank mock tether balance after un staking"
			);

			result = await ethbank.isStaking(investor);
			assert.equal(
				result.toString(),
				"false",
				"investor is staking status after un staking"
			);
		});
	});
});
