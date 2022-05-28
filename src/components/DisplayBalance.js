import React from "react";
import "./DisplayBalance.css";

import { convertFromWei } from "../utils/web3";

function DisplayBalance({ stakingBalance, rewardsBalance }) {
	const convertedStakingBalance = Number(
		convertFromWei(stakingBalance)
	).toFixed(2);

	const convertedRewardsBalance = Number(
		convertFromWei(rewardsBalance)
	).toFixed(2);

	return (
		<div className="displayBalance">
			<div className="displayBalance-section">
				<span className="displayBalance-section-title">
					Staking Balance
				</span>
				<span className="displayBalance-section-value">
					{convertedStakingBalance} mUSDT
				</span>
			</div>
			<div className="displayBalance-section">
				<span className="displayBalance-section-title">
					Rewards Balance
				</span>
				<span className="displayBalance-section-value">
					{convertedRewardsBalance} ERT
				</span>
			</div>
		</div>
	);
}

export default DisplayBalance;
