require('dotenv').config()
if (!!process.env.NODE_ENV) require('dotenv').config({ path: `../.env.${process.env.NODE_ENV.toLowerCase()}`})

const fs = require('fs')

module.exports = (() => {
  this.env = null
  
  const internal = { abi: {} }
  
  const loadJSON = this.loadJSON = (configFile) => {
    try { return JSON.parse(fs.readFileSync(configFile, 'utf8').toString()) }
    catch (e) { console.error(new Error(`(!) Unable to load Config ${configFile}\n`)); return }
  }
  
  function loadABIs() { internal.abi.erc20 = loadJSON('./config/abi/erc20.json') }
  
  this.reload = (env) => {
    this.env = env ? env?.toLowerCase() : (!!process.env?.NODE_ENV ? process.env?.NODE_ENV?.toLowerCase() : 'test')
    const envIsProd = () => (this.env === 'production')
    loadABIs()
    internal.blockchains = loadJSON(`./config/blockchain.${envIsProd() ? 'mainnet' : 'testnet'}.json`)
    return {...this, ...internal}
  }

  return {...this, ...internal}
})()