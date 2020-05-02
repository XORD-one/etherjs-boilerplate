import React, {Component} from 'react'

const ethers = require('ethers')

const provider, network = ''

let contract = ''

let accounts = ''

let ethereum = ''

class Sample extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // important line to enable metamask connection with reactjs
        ethereum = window.ethereum;
        this.metamask()

        // event functions if account changes or network id changes.
        ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
        })
            
        ethereum.on('chainChanged', function (chainId) {
            // Time to make sure your any calls are directed to the correct chain!
        })
    }

    async metamask() {
        if (typeof window.ethereum !== 'undefined') {

            // Check if Ethereum User has metamask installed 
            if (ethereum.isMetaMask) {

                // Use Mist/MetaMask's provider.
                provider = window['ethereum']
    
                //get selected account on metamask
                accounts = await ethereum.send('eth_requestAccounts')
    
                // get network which metamask is connected to (deprecated)
                network = ethereum.networkVersion; 

            }else{
                // meta mask is not installed. 
            }


        } else {
            /*** Ethereum User not detected. ***/
        }
    }

    initContract() {
        contract = new ethers.Contract(/* Contract Address*/, /* ABI */, provider);
    }

    // send transaction to contract (transfer function is an example)
    async sendTransactionToContract(targetAddress,numberOfTokens) {

        // load AbI through interface. 
        let iface = new ethers.utils.Interface(/** ABI */);

        params: [{
            "from": accounts[0] ,
            "to": /** Token_contract_Address */,
            "gas": "0x76c0", // 30400
            "gasPrice": "0x9184e72a000", // 10000000000000
            "value": "0", // 2441406250
            "data": iface.functions.transfer.encode([ targetAddress, numberOfTokens ])
        }]

        ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: accounts[0], // Provide the user's account to use.
        }, (err, response) => {
            if (error) {
                if (error.code === 4001) { // EIP 1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.')
                } else {
                console.error(error)
                }
            } else {
              // this method will return a transaction hash on success.
              const result = response.result
              console.log(result)
            }
        })
    }

     // send transaction to contract (transfer function is an example)
     async sendEther(amount, to_address) {

        params: [{
            "from": accounts[0] ,
            "to": to_address,
            "gas": "0x76c0", // 30400
            "gasPrice": "0x9184e72a000", // 10000000000000
            "value": ethers.utils.parseEther(amount)
        }]

        ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: accounts[0], // Provide the user's account to use.
        }, (err, response) => {
            if (error) {
                if (error.code === 4001) { // EIP 1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.')
                } else {
                console.error(error)
                }
            } else {
              // this method will return a transaction hash on success.
              const result = response.result
              console.log(result)
            }
        })
    }

    // call contracts any function
    async callContract(){
        async (address) => {
            try{
                let balance = await contract.balanceOf(address);
                return (balance.toNumber()).toString();
            }catch (error) {
                console.log(error);
                return false;
            }
        }
    }


    render() {
        // render
    }
}
                                                                                                                                                                                            < /svg>
                                                                                                                                                                                                < /a>
                                                                                                                                                                                                    < /div>
                                                                                                                                                                                                        < /div>)
                                                                                                                                                                                                            }
                                                                                                                                                                                                            }