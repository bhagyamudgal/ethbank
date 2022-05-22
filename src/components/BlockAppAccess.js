import React from "react";
import "./BlockAppAccess.css";

function BlockAppAccess({ message }) {
	return (
		<div className="blockAppAccess">
			<h1>{message}</h1>
		</div>
	);
}

export default BlockAppAccess;
