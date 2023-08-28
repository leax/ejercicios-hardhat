require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const fs = require("fs");
const { ethers } = require('ethers');

/** @type import('hardhat/config').HardhatUserConfig */

function mnemonicToAccount() {
  const mnemonic = fs.readFileSync('mnemonic.txt', 'utf-8').trim();
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  return wallet.privateKey;
}

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.URL_RPC_MUMBAI,
      accounts: [mnemonicToAccount()],
      saveDeployments:true,
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
