const hre = require("hardhat");

async function main() {
  console.log("Deploying EndingNFT contract...");

  const EndingNFT = await hre.ethers.getContractFactory("EndingNFT");
  const endingNFT = await EndingNFT.deploy();

  await endingNFT.waitForDeployment();

  const address = await endingNFT.getAddress();
  console.log("EndingNFT deployed to:", address);

  // Set up ending URIs
  const endings = [
    {
      id: 0,
      uri: "ipfs://QmExample1/iron-throne.json" // The Iron Throne ending
    },
    {
      id: 1,
      uri: "ipfs://QmExample2/independence.json" // Independence ending
    },
    {
      id: 2,
      uri: "ipfs://QmExample3/exile.json" // Exile ending
    },
    {
      id: 3,
      uri: "ipfs://QmExample4/night-king.json" // Night King ending
    }
  ];

  console.log("Setting up ending URIs...");
  for (const ending of endings) {
    const tx = await endingNFT.setEndingURI(ending.id, ending.uri);
    await tx.wait();
    console.log(`Set URI for ending ${ending.id}`);
  }

  console.log("Deployment complete!");
  console.log("\nUpdate CONTRACT_ADDRESS in lib/contract.js to:", address);
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
