const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const initialBaseTokenURI = "https://example.com/api/token/";
  const RevealableNFT = await ethers.getContractFactory("RevealableNFT");
  const nft = await RevealableNFT.deploy("Revealable NFT", "RNFT", initialBaseTokenURI);

  console.log("NFT contract deployed to:", nft.address);

  // Mint an NFT (before reveal)
  await nft.connect(deployer).mint(deployer.address, 1);

  console.log("NFT minted.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
