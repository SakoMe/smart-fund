# Smart Contract Crowdfunding

Ethereum smart contract based cowdfunding webapp

## Tech Stack

* Solidity 4.2.22
* Next.js 5.1.0
* web3 1.0.0-beta.26
* solc 0.4.22
* semantic ui react
* mocha

### Prerequisites

* Node verison 8 or higher
* Metamask Chrome extension (will need the mnemonic as well)
* Infura.io Rinkeby testnet api end point

### Installing

To run locally:

1.  Clone or download the repo
2.  Make a .env file and store the credentials like so:

```
METAMASK_MNEMONIC=<your mnemonic here...>
RINKEBY_ACCOUNT=<infura.io endpoint here>
ADDRESS=<for now leave this blank>
```

3.  From the root of directory cd into ethereum and run node compile.js to create the build folder

```
cd ethereum
node compile.js
```

4.  Once done then run node deploy.js to deploy the contract onto the network (this will generate a contractDeploymentInfo.txt file)

```
node deploy.js
```

5.  Look in the contractDeploymentInfo.txt flie and copy the contract address into the .env

```
ADDRESS=<address here>
```

6.  Navigate back into the root of the project and run yarn install to get all of the dependecies

```
cd ..
yarn (or npm) install
```

7.  Run yarn start to get the dev server going and go to localhost:3000

```
yarn start
```

8.  Open up the browser and navigate to localhost:3000
