import hre from "hardhat";

async function main() {
  // Deploy GameToken
  const GameToken = await hre.ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  
  const gameTokenAddress = await gameToken.getAddress();
  console.log("GameToken deployed to:", gameTokenAddress);

  // Deploy VisualNovel with 10 tokens per decision
  const decisionCost = hre.ethers.parseEther("10");
  const VisualNovel = await hre.ethers.getContractFactory("VisualNovel");
  const visualNovel = await VisualNovel.deploy(gameTokenAddress, decisionCost);
  await visualNovel.waitForDeployment();
  
  const visualNovelAddress = await visualNovel.getAddress();
  console.log("VisualNovel deployed to:", visualNovelAddress);

  // Transfer some tokens to test accounts
  const [owner, player1, player2] = await hre.ethers.getSigners();
  
  const transferAmount = hre.ethers.parseEther("1000");
  await gameToken.transfer(player1.address, transferAmount);
  await gameToken.transfer(player2.address, transferAmount);
  
  console.log("Transferred tokens to test accounts");
  console.log("Player1:", player1.address);
  console.log("Player2:", player2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
