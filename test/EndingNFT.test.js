const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EndingNFT", function () {
  let endingNFT;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    
    const EndingNFT = await ethers.getContractFactory("EndingNFT");
    endingNFT = await EndingNFT.deploy();
    await endingNFT.waitForDeployment();

    // Set up ending URIs
    await endingNFT.setEndingURI(0, "ipfs://ending0");
    await endingNFT.setEndingURI(1, "ipfs://ending1");
    await endingNFT.setEndingURI(2, "ipfs://ending2");
    await endingNFT.setEndingURI(3, "ipfs://ending3");
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await endingNFT.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await endingNFT.name()).to.equal("BersGame Ending");
      expect(await endingNFT.symbol()).to.equal("BERSEND");
    });
  });

  describe("Setting Ending URIs", function () {
    it("Should allow owner to set ending URI", async function () {
      await endingNFT.setEndingURI(4, "ipfs://ending4");
      // Verify by successfully minting with the new ending
      await endingNFT.connect(player1).mintEnding(4);
      expect(await endingNFT.balanceOf(player1.address)).to.equal(1);
    });

    it("Should not allow non-owner to set ending URI", async function () {
      await expect(
        endingNFT.connect(player1).setEndingURI(4, "ipfs://ending4")
      ).to.be.reverted;
    });
  });

  describe("Minting", function () {
    it("Should mint an ending NFT", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      expect(await endingNFT.balanceOf(player1.address)).to.equal(1);
    });

    it("Should not allow minting same ending twice", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      await expect(
        endingNFT.connect(player1).mintEnding(0)
      ).to.be.revertedWith("Already minted this ending");
    });

    it("Should allow minting different endings", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      await endingNFT.connect(player1).mintEnding(1);
      expect(await endingNFT.balanceOf(player1.address)).to.equal(2);
    });

    it("Should not allow minting ending without URI", async function () {
      await expect(
        endingNFT.connect(player1).mintEnding(10)
      ).to.be.revertedWith("Ending URI not set");
    });

    it("Should emit EndingMinted event", async function () {
      await expect(endingNFT.connect(player1).mintEnding(0))
        .to.emit(endingNFT, "EndingMinted")
        .withArgs(player1.address, 0, 0);
    });
  });

  describe("Tracking player endings", function () {
    it("Should track player endings correctly", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      await endingNFT.connect(player1).mintEnding(2);
      
      const endings = await endingNFT.getPlayerEndings(player1.address);
      expect(endings.length).to.equal(2);
      expect(endings[0]).to.equal(0); // First token ID
      expect(endings[1]).to.equal(1); // Second token ID
    });

    it("Should check if player minted specific ending", async function () {
      await endingNFT.connect(player1).mintEnding(1);
      
      expect(await endingNFT.hasPlayerMintedEnding(player1.address, 1)).to.be.true;
      expect(await endingNFT.hasPlayerMintedEnding(player1.address, 0)).to.be.false;
    });
  });

  describe("Multiple players", function () {
    it("Should allow different players to mint same ending", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      await endingNFT.connect(player2).mintEnding(0);
      
      expect(await endingNFT.balanceOf(player1.address)).to.equal(1);
      expect(await endingNFT.balanceOf(player2.address)).to.equal(1);
    });
  });

  describe("Total Supply", function () {
    it("Should track total supply correctly", async function () {
      await endingNFT.connect(player1).mintEnding(0);
      await endingNFT.connect(player2).mintEnding(1);
      await endingNFT.connect(player1).mintEnding(2);
      
      expect(await endingNFT.totalSupply()).to.equal(3);
    });
  });
});
