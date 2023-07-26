// scripts/deployCTF2023.js
require('dotenv').config()

const { web3, network, artifacts } = require("hardhat")

async function main() {
  const accounts = await web3.eth.getAccounts()
  const [ deployer ] = accounts
  let deployerBalance = await web3.eth.getBalance(deployer)
  deployerBalance = parseFloat(web3.utils.fromWei(deployerBalance, 'ether'))
  console.log(`(i) Deployer: ${deployer} (${deployerBalance.toLocaleString("en-US", { useGrouping: true })} coins)`)
  console.log()

  // const ctf2023 = await ethers.getContractFactory("CTF2023")
  const ctf2023 = await artifacts.require("CTF2023")

  const contract = await ctf2023.new(web3.utils.toHex((1*(10**6)).toString()), { from: deployer, gasLimit: 6700000 })
  console.log(`(i) CTF2023 contract: ${contract.address}`)
  console.log(`(i) CTF2023 deployment transaction: ${contract.transactionHash}`)
  return contract
}

main().then(() => process.exit(0)).catch((error) => { throw error })