require('dotenv').config({ path: `../.env` })

const { assert, contract, artifacts } = require("hardhat")
const { balance, expectEvent, expectRevert, time } = require('@openzeppelin/test-helpers')
const { web3 } = require("@openzeppelin/test-helpers/src/setup")
const { expect } = require('chai')

console.log(`(i) Hardhat version: ${require('hardhat/package.json').version}`)
console.log(`(i) Node version: ${process.version}`)
console.log(`(i) Web3 version: ${require('web3/package.json').version}`)
console.log(`(i) OpenZeppelin version: ${require('@openzeppelin/contracts/package.json').version}`)
console.log(`(i) OpenZeppelin Test Helpers version: ${require('@openzeppelin/test-helpers/package.json').version}`)

contract('CTF2023', function(accounts) {

  const _CTF2023 = artifacts.require('CTF2023')

  before(async function() {
    [ this.deployer ] = accounts

    let deployerBalance = await web3.eth.getBalance(this.deployer)
    deployerBalance = parseFloat(web3.utils.fromWei(deployerBalance, 'ether'))
    console.log(`\n• Deployer: ${this.deployer} (${deployerBalance.toLocaleString("en-US", { useGrouping: true })} coins)`)
  })

  it('CTF2023: should deploy smartcontract', async function() {
    this.deployParams = {
      /* totalSupply         */ initialSupply: web3.utils.toHex((1*(10**6)).toString()),
    }
    this.CTF2023 = await _CTF2023.new(...Object.values(this.deployParams), { from: this.deployer, gas: 5000000 })
    console.log(`(i) CTF2023 contract: ${this.CTF2023.address}`);
    console.log(`(i) CTF2023 deployement transaction: ${this.CTF2023.transactionHash}`);

    expect(this.CTF2023.address).to.be.not.equal('0x0000000000000000000000000000000000000000')
    expect(this.CTF2023.address).to.be.not.null
  })

  it('CTF2023: token name is CTF 2030', async function() {
    const tokenName = await this.CTF2023.name()
    expect(tokenName).to.be.equal('CTF 2023')
  })

  it('CTF2023: token symbol is CTF', async function() {
    const tokenSymbol = await this.CTF2023.symbol()
    expect(tokenSymbol).to.be.equal('CTF')
  })

  it('CTF2023: token decimals is 18', async function() {
    const tokenDecimals = await this.CTF2023.decimals()
    expect(tokenDecimals).to.be.bignumber.equal('18')
  })

  it('CTF2023: token totalSupply is 1M', async function() {
    const tokenTotalSupply = await this.CTF2023.totalSupply()
    expect(tokenTotalSupply).to.be.bignumber.equal(this.deployParams.initialSupply)
  })

  it('CTF2023: token owner is deployer', async function() {
    const tokenOwner = await this.CTF2023.owner()
    expect(tokenOwner).to.be.equal(this.deployer)
  })
})