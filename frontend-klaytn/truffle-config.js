const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = "1001";
const GASLIMIT = "20000000";
const URL = "https://api.baobab.klaytn.net:8651";
const PRIVATE_KEY = "0x7419fdcbf05b94e076fdc7e35888b2405c7658715ce877ce9487d912cae2e155";

module.exports = {
  networks: {
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null
    },
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id 
    },
  },

  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
