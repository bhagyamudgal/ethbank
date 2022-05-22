import React from "react";
import "./DisplayBalance.css";

import { convertFromWei } from "../utils/web3";

function DisplayBalance({ stakingBalance, rewardsBalance }) {
	return (
		<div className="displayBalance">
			<div className="displayBalance-section">
				<span className="displayBalance-section-title">
					Staking Balance
				</span>
				<span className="displayBalance-section-value">
					{convertFromWei(stakingBalance)} USDT
				</span>
			</div>
			<div className="displayBalance-section">
				<span className="displayBalance-section-title">
					Rewards Balance
				</span>
				<span className="displayBalance-section-value">
					{convertFromWei(rewardsBalance)} ERT
				</span>
			</div>
		</div>
	);
}

export default DisplayBalance;
