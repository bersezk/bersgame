// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EndingNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    // Mapping from ending ID to token URI
    mapping(uint256 => string) private _endingURIs;
    
    // Mapping from player address to their minted endings
    mapping(address => uint256[]) private _playerEndings;
    
    // Mapping to check if player already minted a specific ending
    mapping(address => mapping(uint256 => bool)) private _hasPlayerMintedEnding;
    
    event EndingMinted(address indexed player, uint256 indexed tokenId, uint256 indexed endingId);
    
    constructor() ERC721("BersGame Ending", "BERSEND") Ownable(msg.sender) {}
    
    /**
     * @dev Sets the URI for a specific ending ID
     * @param endingId The ID of the ending (0-based)
     * @param uri The metadata URI for this ending
     */
    function setEndingURI(uint256 endingId, string memory uri) external onlyOwner {
        _endingURIs[endingId] = uri;
    }
    
    /**
     * @dev Mints an ending NFT to the player
     * @param endingId The ID of the ending achieved
     */
    function mintEnding(uint256 endingId) external {
        require(bytes(_endingURIs[endingId]).length > 0, "Ending URI not set");
        require(!_hasPlayerMintedEnding[msg.sender][endingId], "Already minted this ending");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _endingURIs[endingId]);
        
        _playerEndings[msg.sender].push(tokenId);
        _hasPlayerMintedEnding[msg.sender][endingId] = true;
        
        emit EndingMinted(msg.sender, tokenId, endingId);
    }
    
    /**
     * @dev Returns all token IDs owned by a player
     * @param player The address of the player
     */
    function getPlayerEndings(address player) external view returns (uint256[] memory) {
        return _playerEndings[player];
    }
    
    /**
     * @dev Checks if a player has already minted a specific ending
     * @param player The address of the player
     * @param endingId The ID of the ending
     */
    function hasPlayerMintedEnding(address player, uint256 endingId) external view returns (bool) {
        return _hasPlayerMintedEnding[player][endingId];
    }
    
    /**
     * @dev Returns the total number of NFTs minted
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
    
    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
