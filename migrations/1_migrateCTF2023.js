const _CTF2023 = artifacts.require("CTF2023")

module.exports = async function (deployer) {
  return await deployer.deploy(_CTF2023, web3.utils.toHex((1*(10**6)).toString()))
}
