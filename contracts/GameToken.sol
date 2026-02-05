// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GameToken
 * @dev ERC20 token used for making decisions in the visual novel
 */
contract GameToken is ERC20, Ownable {
    constructor() ERC20("BersGame Token", "BERS") Ownable(msg.sender) {
        // Mint initial supply to contract owner
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /**
     * @dev Allows owner to mint new tokens
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from a specific address (used by VisualNovel contract)
     */
    function burnFrom(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
