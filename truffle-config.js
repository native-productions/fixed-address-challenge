require("dotenv").config()

const HDWalletProvider = require("@truffle/hdwallet-provider")

const plugins = []
const compilers = {
  solc: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

function getRPC(config, preferredChain) {
  if (config === 'fork') return `http://127.0.0.1:8545`
  var blockchain = config.blockchains.filter((d) => d.id === preferredChain)
  blockchain = blockchain.length > 0 ? blockchain[0] : null
  if (!blockchain) throw new Error(`No blockchain config found for "${preferredChain}"`)
  var endpoint = blockchain.rpc.endpoints.filter((d) => d.id === blockchain.rpc.defaultEndpoint)
  endpoint = endpoint.length > 0 ? endpoint[0] : null
  if (!endpoint) throw new Error(`No RPC endpoint config found for ${preferredChain} - "${blockchain.rpc.defaultEndpoint}"`)
  console.log('(i) RPC: ', endpoint[blockchain.rpc.defaultConnection])
  return endpoint[blockchain.rpc.defaultConnection]
}

const networks = {
  development: {
    host: "localhost",
    port: 8545,
    network_id: "*",
  },

  bsc_mainnet: {
    env: process.env.NODE_ENV,
    blockchain: 'smartchain',
    network_id: "*",
    provider: new HDWalletProvider({
      privateKeys: [process.env.ACC_DEPLOYER.replace('0x', '')],
      providerOrUrl: getRPC(require('./config').reload('production'), 'smartchain'),
      gas: 6700000, // Gas sent with each transaction (default: ~6700000)
    }),
  },
  bsc_testnet: {
    env: process.env.NODE_ENV,
    blockchain: 'smartchain',
    network_id: "*",
    provider: new HDWalletProvider({
      privateKeys: [process.env.ACC_DEPLOYER.replace('0x', '')],
      providerOrUrl: getRPC(require('./config').reload('test'), 'smartchain'),
      gas: 6700000, // Gas sent with each transaction (default: ~6700000)
    }),
  },
}

module.exports = { plugins, networks, compilers, }
