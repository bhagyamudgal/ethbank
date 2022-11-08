
# Ethbank

A minimal decentralized banking application (dApp) deployed on the Rinkeby test network on the Ethereum blockchain. Using this application, users can stake their mUSDT tokens and can earn ethbank-owned ERT tokens as rewards on their staked amount.

**Link to App -** https://ethbank.netlify.app/

**My Portfolio Website -** https://www.bhagyamudgal.com/




## Tech Stack

**Front-End:** React.js, JavaScript, Web3.js

**Smart Contract:** Truffle, Solidity

**Testing:** Chai


## Screenshots

![App Screenshot 1](https://i.imgur.com/GPAl2ax.png)
## Demo

**Demo 1 (User Use Case) -** https://youtu.be/kZP5HpR3TJQ

**Demo 2 (Owner Use Case) -** https://youtu.be/a-RhO4JY9pA
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can take reference from the .env-example file present in the project.

`INFURA_API_KEY_URL`

`RINKEBY_PRIVATE_KEY`

`REACT_APP_OWNER_PUBLIC_ADDRESS`


## Deployment of Smart Contract and Run Locally

To deploy the smart contract used in this project to the Rinkeby test network:

Clone the project

```bash
  git clone https://github.com/bhagyamudgal/ethbank.git
```

Go to the project directory

```bash
  cd ethbank
```

Install dependencies

```bash
  npm install
```

Install truffle globally

```bash
  npm install -g truffle
```

Set up environment variables - you can take reference from the example env file (.env-example)

Get your `INFURA_API_KEY_URL` for the rinkeby network from https://infura.io/

Get your `RINKEBY_PRIVATE_KEY` from your wallet account from which you want to deploy the contract

Make sure you have some rinkeby test ethers in the above-mentioned account for the deployment transaction to be successful. You can get some from https://rinkebyfaucet.com/  

After you are done with the env file you have to run the following command to deploy your contract to the Rinkeby test network

```
truffle migrate --network rinkeby
```

After a successful deployment of the smart contract you can run a frontend application to interact with the smart contract:

Set up an environment variable for the front end

Add the public address of the account you used to deploy your smart contract to the `REACT_APP_OWNER_PUBLIC_ADDRESS` key in the env file.

After you are done with env

Run the following command to start your react application

```
npm start
```


## Feedback

If you have any feedback, please reach out to me at bhagyamudgal@gmail.com

