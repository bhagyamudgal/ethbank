import React, { useState } from "react";
import "./StakingForm.css";

import { convertFromWei, convertToWei } from "../utils/web3";

const ownerAddress = process.env.REACT_APP_OWNER_PUBLIC_ADDRESS;

function StakingForm({
	accountBalance,
	contractData,
	accountAddress,
	setReloadData,
	setError,
	setSuccess,
}) {
	const accountBalanceInTether = Number(
		convertFromWei(accountBalance)
	).toFixed(2);

	const [stakingAmountValue, setStakingAmountValue] = useState("");
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [loading, setLoading] = useState({
		deposit: false,
		withdraw: false,
		airdrop: false,
	});

	const renderIssueRewardsButton = () => {
		if (ownerAddress === accountAddress) {
			return (
				<div className="stakingForm-form-section">
					<button
						type="button"
						disabled={loading.issueRewards}
						onClick={issueRewardsHandler}
					>
						{loading.issueRewards
							? "Sending rewards..."
							: "ISSUE REWARDS"}
					</button>
				</div>
			);
		}
		return null;
	};

	const stakingAmountValueHandler = (event) => {
		const valueInString = event.target.value;

		const valueInNumber = Number(valueInString);

		if (valueInNumber <= 0) {
			setIsBtnDisabled(true);
		} else {
			setIsBtnDisabled(false);
		}

		setStakingAmountValue(valueInString);
	};

	// function to stake/deposit tokens
	const depositHandler = async () => {
		try {
			setLoading((prevState) => {
				return { ...prevState, deposit: true };
			});

			// console.log({ stakingAmountValue });

			const ethbank = contractData.ethbank;
			const tether = contractData.tether;

			await tether.methods
				.approve(ethbank._address, convertToWei(stakingAmountValue))
				.send({ from: accountAddress });

			await ethbank.methods
				.depositTokens(convertToWei(stakingAmountValue))
				.send({ from: accountAddress });

			setLoading((prevState) => {
				return { ...prevState, deposit: false };
			});

			setStakingAmountValue("");

			setSuccess({
				status: true,
				message: "mUSDT Tokens staked successfully!",
			});

			setReloadData((prevState) => prevState + 1);
		} catch (error) {
			console.log("depositHandler => ", { error });
			setLoading((prevState) => {
				return { ...prevState, deposit: false };
			});
			setError({
				status: true,
				message: "Error while depositing tokens! Please try again.",
			});
		}
	};

	// function to un-stake/withdraw tokens
	const withdrawHandler = async () => {
		try {
			setLoading((prevState) => {
				return { ...prevState, withdraw: true };
			});

			const ethbank = contractData.ethbank;

			await ethbank.methods
				.unstakeTokens()
				.send({ from: accountAddress });

			setLoading((prevState) => {
				return { ...prevState, withdraw: false };
			});

			setSuccess({
				status: true,
				message: "mUSDT Tokens withdrawn successfully!",
			});

			setReloadData((prevState) => prevState + 1);
		} catch (error) {
			console.log("withdrawHandler => ", { error });
			setLoading((prevState) => {
				return { ...prevState, withdraw: false };
			});
			setError({
				status: true,
				message: "Error while withdrawing tokens! Please try again.",
			});
		}
	};

	const airdropHandler = async () => {
		try {
			setLoading((prevState) => {
				return { ...prevState, airdrop: true };
			});

			const tether = contractData.tether;

			await tether.methods.airdrop().send({ from: accountAddress });

			setLoading((prevState) => {
				return { ...prevState, airdrop: false };
			});

			setSuccess({
				status: true,
				message:
					"mUSDT Tokens got transferred to your address successfully!",
			});

			setReloadData((prevState) => prevState + 1);
		} catch (error) {
			console.log("airdropHandler => ", { error });
			setLoading((prevState) => {
				return { ...prevState, airdrop: false };
			});
			setError({
				status: true,
				message: "Error while getting airdrop! Please try again.",
			});
		}
	};

	const issueRewardsHandler = async () => {
		try {
			setLoading((prevState) => {
				return { ...prevState, issueRewards: true };
			});

			const ethbank = contractData.ethbank;

			await ethbank.methods.issueRewards().send({ from: accountAddress });

			setLoading((prevState) => {
				return { ...prevState, issueRewards: false };
			});

			setSuccess({
				status: true,
				message:
					"ERT Tokens distributed to all the stakers successfully!",
			});

			setReloadData((prevState) => prevState + 1);
		} catch (error) {
			console.log("issueRewardsHandler => ", { error });
			setLoading((prevState) => {
				return { ...prevState, issueRewards: false };
			});
			setError({
				status: true,
				message: "Error while issuing rewards! Please try again.",
			});
		}
	};

	return (
		<div className="stakingForm">
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				className="stakingForm-form"
			>
				<div className="stakingForm-form-section">
					<p>Balance: {accountBalanceInTether} mUSDT</p>
				</div>
				<div
					className="stakingForm-form-section"
					style={{ marginBottom: "2rem" }}
				>
					<label htmlFor="stakeAmount">Stake Tokens:</label>
					<input
						type="number"
						placeholder="Enter Amount"
						min={0}
						onChange={stakingAmountValueHandler}
						value={stakingAmountValue}
					/>
				</div>

				<div className="stakingForm-form-section">
					<button
						type="button"
						disabled={isBtnDisabled || loading.deposit}
						onClick={depositHandler}
					>
						{loading.deposit ? "Depositing..." : "DEPOSIT"}
					</button>
				</div>

				<div className="stakingForm-form-section">
					<button
						type="button"
						disabled={loading.withdraw}
						onClick={withdrawHandler}
					>
						{loading.withdraw ? "Withdrawing..." : "WITHDRAW"}
					</button>
				</div>

				<div className="stakingForm-form-section">
					<button
						type="button"
						disabled={loading.airdrop}
						onClick={airdropHandler}
					>
						{loading.airdrop
							? "Sending you 100 mUSDT..."
							: "Get 100 mUSDT"}
					</button>
				</div>

				{renderIssueRewardsButton()}
			</form>
		</div>
	);
}

export default StakingForm;
