require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-truffle5")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config({ path: `.env` })

// require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-web3")

function getRPC(config, preferredChain) {
  if (config === 'fork') return `http://127.0.0.1:8545`
  var blockchain = config.blockchains.filter((d) => d.id === preferredChain)
  blockchain = blockchain.length > 0 ? blockchain[0] : null
  if (!blockchain) throw new Error(`No blockchain config found for "${preferredChain}"`)
  var endpoint = blockchain.rpc.endpoints.filter((d) => d.id === blockchain.rpc.defaultEndpoint)
  endpoint = endpoint.length > 0 ? endpoint[0] : null
  if (!endpoint) throw new Error(`No RPC endpoint config found for ${preferredChain} - "${blockchain.rpc.defaultEndpoint}"`)
  // console.log('(i) RPC: ', endpoint[blockchain.rpc.defaultConnection])
  return endpoint[blockchain.rpc.defaultConnection]
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // accounts: [{ privateKey: process.env.ACC_DEPLOYER.replace('0x', ''), balance: "1000000000000000000000" }],
    },
    development: {
      url: 'http://localhost:8545/',
      accounts: [process.env.ACC_DEPLOYER.replace('0x', '')],
    },
    
    bsc_mainnet: {
      env: 'production',
      blockchain: 'smartchain',
      url: getRPC(require('./config').reload('production'), 'smartchain'),
      accounts: [process.env.ACC_DEPLOYER.replace('0x', '')],
      gas: 6700000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 10000000000, // 10 gwei (in wei) (default: 5 gwei)
    },
    bsc_testnet: {
      env: 'test',
      blockchain: 'smartchain',
      url: getRPC(require('./config').reload('test'), 'smartchain'),
      accounts: [process.env.ACC_DEPLOYER.replace('0x', '')],
      gas: 6700000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 10000000000, // 10 gwei (in wei) (default: 5 gwei)
    },
  },
  plugins: [],
}
