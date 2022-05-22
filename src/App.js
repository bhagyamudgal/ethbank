import React, { useEffect, useState } from "react";
import Web3 from "web3";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// components
import Header from "./components/Header";
import Hero from "./components/Hero";
import DisplayBalance from "./components/DisplayBalance";
import BlockAppAccess from "./components/BlockAppAccess";

// css
import "./App.css";

// contracts
import Tether from "./build/contracts/Tether.json";
import ERT from "./build/contracts/ERT.json";
import Ethbank from "./build/contracts/Ethbank.json";
import StakingForm from "./components/StakingForm";
import DisplayError from "./components/DisplayError";

function App() {
	NProgress.configure({ showSpinner: false });

	const [accountAddress, setAccountAddress] = useState("0x0");

	const [reloadData, setReloadData] = useState(false);

	const [blockAppAccess, setBlockAppAccess] = useState({
		status: false,
		message: "",
	});

	const [error, setError] = useState({ status: false, message: null });

	const [contractData, setContractData] = useState({
		tether: null,
		ert: null,
		ethbank: null,
		tetherBalance: "0",
		ertBalance: "0",
		ethbankBalance: "0",
		loading: true,
	});

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			setBlockAppAccess({
				status: true,
				message:
					"No Ethereum wallet detected! You can checkout MetaMask and reload app.",
			});
		}
	};

	const loadBlockchainData = async () => {
		try {
			setContractData((prevState) => {
				return { ...prevState, loading: true };
			});

			const web3 = window.web3;

			const account = await web3.eth.getAccounts();
			setAccountAddress(account[0]);

			// getting network id
			const networkId = await web3.eth.net.getId();

			// loading tether contract
			const tetherData = Tether.networks[networkId];

			if (tetherData) {
				const tether = new web3.eth.Contract(
					Tether.abi,
					tetherData.address
				);

				const tetherBalance = await tether.methods
					.balanceOf(account[0])
					.call();

				// console.log({ tether, tetherBalance });

				setContractData((prevState) => {
					return { ...prevState, tether, tetherBalance };
				});
			} else {
				setBlockAppAccess({
					status: true,
					message:
						"Wrong network detected! Please switch your network and reload app.",
				});
			}

			// loading ert contract
			const ertData = ERT.networks[networkId];

			if (ertData) {
				const ert = new web3.eth.Contract(ERT.abi, ertData.address);

				const ertBalance = await ert.methods
					.balanceOf(account[0])
					.call();

				// console.log({ ert, ertBalance });

				setContractData((prevState) => {
					return { ...prevState, ert, ertBalance };
				});
			} else {
				setBlockAppAccess({
					status: true,
					message:
						"Wrong network detected! Please switch your network and reload app.",
				});
			}

			// loading ethbank contract
			const ethbankData = Ethbank.networks[networkId];

			if (ethbankData) {
				const ethbank = new web3.eth.Contract(
					Ethbank.abi,
					ethbankData.address
				);

				const ethbankBalance = await ethbank.methods
					.stakingBalance(account[0])
					.call();

				// console.log({ ethbank, ethbankBalance });

				setContractData((prevState) => {
					return { ...prevState, ethbank, ethbankBalance };
				});
			} else {
				setBlockAppAccess({
					status: true,
					message:
						"Wrong network detected! Please switch your network and reload app.",
				});
			}

			setContractData((prevState) => {
				return { ...prevState, loading: false };
			});
		} catch (error) {
			console.log("loadBlockchainData => ", { error });

			setContractData((prevState) => {
				return { ...prevState, loading: false };
			});
		}
	};

	useEffect(() => {
		loadWeb3();
		loadBlockchainData();
	}, []);

	useEffect(() => {
		if (reloadData) {
			loadBlockchainData();
			setReloadData(false);
		}
	}, [reloadData]);

	useEffect(() => {
		if (contractData.loading) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [contractData.loading]);

	useEffect(() => {
		if (error.status) {
			window.scrollTo(0, 0);
			setTimeout(() => {
				setError({ status: false, message: "" });
			}, 10000);
		}
	}, [error.status]);

	return (
		<main className="app">
			{blockAppAccess.status && (
				<BlockAppAccess message={blockAppAccess.message} />
			)}

			{error.status && <DisplayError message={error.message} />}
			<Header accountAddress={accountAddress} />
			<Hero />
			<DisplayBalance
				stakingBalance={contractData.ethbankBalance}
				rewardsBalance={contractData.ertBalance}
			/>
			<StakingForm
				accountBalance={contractData.tetherBalance}
				contractData={contractData}
				accountAddress={accountAddress}
				setReloadData={setReloadData}
				setError={setError}
			/>
		</main>
	);
}

export default App;
