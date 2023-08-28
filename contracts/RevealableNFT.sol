// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RevealableNFT is ERC721, Ownable {
    string private baseTokenURI;
    bool public isRevealed;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initialBaseTokenURI
    ) ERC721(_name, _symbol) {
        baseTokenURI = _initialBaseTokenURI;
        isRevealed = false;
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) external onlyOwner {
        baseTokenURI = _newBaseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function reveal() external onlyOwner {
        isRevealed = true;
    }

    function mint(address _to, uint256 _tokenId) external onlyOwner {
        require(!isRevealed, "NFT is already revealed");
        _mint(_to, _tokenId);
    }
}
