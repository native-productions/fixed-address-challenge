// contracts/CTF2023.sol

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CTF2023 is ERC20, Ownable {

    constructor(uint256 initialSupply) ERC20("CTF 2023", "CTF") {
        _mint(msg.sender, initialSupply);
    }

}