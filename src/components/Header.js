import React from "react";
import "./Header.css";

function Header({ accountAddress }) {
	const shortenedAccountAddress =
		accountAddress.slice(0, 5) + "..." + accountAddress.slice(-4);

	return (
		<header className="header">
			<div className="header-logo">
				<img
					src="/images/logo.png"
					alt="ethbank-logo"
					className="header-logo-image"
				/>
				<span className="header-logo-text">Ethbank</span>
			</div>

			<div className="header-account">
				Account: {shortenedAccountAddress}
			</div>
		</header>
	);
}

export default Header;
