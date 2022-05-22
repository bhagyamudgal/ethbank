import React, { useState } from "react";
import "./StakingForm.css";

import { convertFromWei, convertToWei } from "../utils/web3";

function StakingForm({
	accountBalance,
	contractData,
	accountAddress,
	setReloadData,
	setError,
}) {
	const [stakingAmountValue, setStakingAmountValue] = useState(null);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [loading, setLoading] = useState({ deposit: false, withdraw: false });

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
				.send({ from: accountAddress })
				.on("transactionHash", (hash) => {
					setLoading((prevState) => {
						return { ...prevState, deposit: false };
					});

					setReloadData(true);

					setStakingAmountValue(null);
				});
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

	const withdrawHandler = async () => {
		try {
			setLoading((prevState) => {
				return { ...prevState, withdraw: true };
			});

			const ethbank = contractData.ethbank;

			await ethbank.methods
				.unstakeTokens()
				.send({ from: accountAddress })
				.on("transactionHash", (hash) => {
					setLoading((prevState) => {
						return { ...prevState, withdraw: false };
					});

					setReloadData(true);

					setStakingAmountValue(null);
				});
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

	const airdropHandler = () => {};

	return (
		<div className="stakingForm">
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				className="stakingForm-form"
			>
				<div className="stakingForm-form-section">
					<p>Balance: {convertFromWei(accountBalance)} USDT</p>
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
						disabled={isBtnDisabled || loading.withdraw}
						onClick={withdrawHandler}
					>
						{loading.withdraw ? "Withdrawing..." : "WITHDRAW"}
					</button>
				</div>

				<div className="stakingForm-form-section">
					<button type="button" onClick={airdropHandler}>
						AIRDROP
					</button>
				</div>
			</form>
		</div>
	);
}

export default StakingForm;
