const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = "1001";
const GASLIMIT = "20000000";
const URL = "https://api.baobab.klaytn.net:8651";
const PRIVATE_KEY = "";

module.exports = {
  networks: {
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null
    }
  },

  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
