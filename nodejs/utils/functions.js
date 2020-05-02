// import ethers.js
const ethers = require('ethers');
// import web3
const web3 = require('web3');
// import axios
var axios = require('axios');
// import contant file
var constants = require('./constant');

/*
    Provider for infura
    let provider = new ethers.providers.InfuraProvider( [ network = 'rinkeby' ] [ , apiAccessToken ] )
*/ 

//Provider for metamask
let currentProvider = new web3.providers.HttpProvider('http://localhost:8545');
let web3Provider = new ethers.providers.Web3Provider(currentProvider);

// Load wallet from private key.
let wallet = new ethers.Wallet(constants.PRIVATE_KEY, web3Provider);

// Load deployed contract
let contract = new ethers.Contract(constants.CONTRACT_ADDRESS, constants.ABI, web3Provider);


exports.createWallet = async () => {
    try {
        let myWallet = ethers.Wallet.createRandom();
        
        console.log(myWallet.address);
        console.log(myWallet.privateKey);

    } catch (error){

    }
}

// function for Ether transfer.
exports.transfer = async (_to, _amount)=> {
    
    try {
        // get transaction nounce
        let txNonce = await web3Provider.getTransactionCount(constants.PUBLIC_KEY,"pending");
        // Convert ether to wei
        _amount = await ethers.utils.parseEther(_amount);

        let transactiom = {
            to: _to,
            nonce : txNonce, 
            gasPrice: gasPrices.medium * 1000000000,
            gasLimit: web3.utils.toHex(300000),
            value: _amount,
            chainId: 5777 //EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        // Send the transaction
        let result = await wallet.sendTransaction(transactiom);

        // The second parameter passed means number of confirmations to wait.
        await web3Provider.waitForTransaction(result.hash,2);

        return result.hash;

    } catch (error){
        console.log(error)
        return false;
    }
}

// function for token tranfer.
exports.transferToken = async (targetAddress,amount) => {
    
    try{
        // load AbI through interface. 
        let iface = new ethers.utils.Interface(constants.ABI);
        // get Current nonce.
        let txNonce = await web3Provider.getTransactionCount(constants.PUBLIC_KEY,"pending");
        var numberOfDecimals = 18;
        var numberOfTokens = ethers.utils.parseUnits(amount,numberOfDecimals); // convert to 18 decimals

        let transaction = {
            to: constants.CONTRACT_ADDRESS,
            gasLimit: web3.utils.toHex(300000),
            gasPrice: gasPrices.medium * 1000000000,
            nonce : txNonce,
            value: 0,
            // pass the interface here in data field.
            data : iface.functions.transfer.encode([ targetAddress, numberOfTokens ]) ,
            chainId: 5777 //EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        // Send the transaction
        let result = await wallet.sendTransaction(transaction);

        // The second parameter passed means number of confirmations to wait.
        await web3Provider.waitForTransaction(result.hash,2); 

        return result.hash;

    } catch (error){
        console.log(error)
        return false;
    }
}

// function to query amount of tokens an address currently owns.
exports.getTokenBalance = async (address) => {
    try{
        let balancePromise = await contract.balanceOf(address);
        return (balancePromise.toNumber()).toString();
    }catch (error) {
        console.log(error);
        return false;
    }
}

// function to sign a text.
exports.signMessage = async (message) => {
    try{
        let result = await wallet.signMessage(message);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// function split signature
exports.splitSignature = async (signature) => {
    try{
        let expanded = ethers.utils.splitSignature(signature);
        console.log(expanded);
        return (expanded);
    } catch (error) {
        console.log(error);
        return false;
    }
}

// function for retrieving current Nonce.
exports.getNonceByEthAddress = async () => {
    try {
        let nonce = await wallet.getTransactionCount();
        return (nonce);
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.arrayify = async (signature) => {
    try {
        let result  = ethers.utils.arrayify(signature);
        return result; 
    } catch (error) {
        console.log(error);
        return false;
    }
}

// function for getting current gas price.
exports.getCurrentGasPrices = async () => {
    try {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10
        };
        return prices;

    } catch (error) {
        console.log(error);
    }
}