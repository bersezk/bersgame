import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("VisualNovel", function () {
  let gameToken;
  let visualNovel;
  let owner;
  let player1;
  let player2;
  const decisionCost = ethers.parseEther("10");

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    // Deploy GameToken
    const GameToken = await ethers.getContractFactory("GameToken");
    gameToken = await GameToken.deploy();
    await gameToken.waitForDeployment();

    // Deploy VisualNovel
    const VisualNovel = await ethers.getContractFactory("VisualNovel");
    visualNovel = await VisualNovel.deploy(await gameToken.getAddress(), decisionCost);
    await visualNovel.waitForDeployment();

    // Transfer tokens to players
    await gameToken.transfer(player1.address, ethers.parseEther("1000"));
    await gameToken.transfer(player2.address, ethers.parseEther("1000"));
  });

  describe("Game Token", function () {
    it("Should have correct name and symbol", async function () {
      expect(await gameToken.name()).to.equal("BersGame Token");
      expect(await gameToken.symbol()).to.equal("BERS");
    });

    it("Should transfer tokens correctly", async function () {
      const balance = await gameToken.balanceOf(player1.address);
      expect(balance).to.equal(ethers.parseEther("1000"));
    });
  });

  describe("Visual Novel Game", function () {
    it("Should start game correctly", async function () {
      await visualNovel.connect(player1).startGame();
      
      const [currentChapter, currentScene, totalDecisions, gameStarted] = 
        await visualNovel.getPlayerState(player1.address);
      
      expect(gameStarted).to.be.true;
      expect(currentChapter).to.equal(1);
      expect(currentScene).to.equal(1);
      expect(totalDecisions).to.equal(0);
    });

    it("Should not allow starting game twice", async function () {
      await visualNovel.connect(player1).startGame();
      await expect(
        visualNovel.connect(player1).startGame()
      ).to.be.revertedWith("Game already started");
    });

    it("Should make decision and burn tokens", async function () {
      await visualNovel.connect(player1).startGame();
      
      const initialBalance = await gameToken.balanceOf(player1.address);
      
      // Approve tokens for burning
      await gameToken.connect(player1).approve(await visualNovel.getAddress(), decisionCost);
      
      // Make decision
      await expect(visualNovel.connect(player1).makeDecision(1, 1))
        .to.emit(visualNovel, "DecisionMade")
        .withArgs(player1.address, 1, 1, decisionCost);
      
      const finalBalance = await gameToken.balanceOf(player1.address);
      expect(initialBalance - finalBalance).to.equal(decisionCost);
      
      const decision = await visualNovel.getPlayerDecision(player1.address, 1);
      expect(decision).to.equal(1);
    });

    it("Should not allow decision without sufficient tokens", async function () {
      await visualNovel.connect(player1).startGame();
      
      // Transfer away most tokens
      await gameToken.connect(player1).transfer(
        player2.address, 
        ethers.parseEther("995")
      );
      
      await gameToken.connect(player1).approve(await visualNovel.getAddress(), decisionCost);
      
      await expect(
        visualNovel.connect(player1).makeDecision(1, 1)
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should progress through scenes and chapters", async function () {
      await visualNovel.connect(player1).startGame();
      
      await visualNovel.connect(player1).progressScene();
      let [, currentScene] = await visualNovel.getPlayerState(player1.address);
      expect(currentScene).to.equal(2);
      
      await visualNovel.connect(player1).completeChapter();
      let [currentChapter, newScene] = await visualNovel.getPlayerState(player1.address);
      expect(currentChapter).to.equal(2);
      expect(newScene).to.equal(1);
    });
  });
});
