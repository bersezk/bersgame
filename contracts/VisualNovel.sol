// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GameToken.sol";

/**
 * @title VisualNovel
 * @dev Main contract for the blockchain visual novel where decisions burn tokens
 */
contract VisualNovel {
    GameToken public gameToken;
    uint256 public decisionCost;
    
    struct GameState {
        uint256 currentChapter;
        uint256 currentScene;
        mapping(uint256 => uint256) decisions; // chapterId => decisionId
        uint256 totalDecisions;
        bool gameStarted;
    }
    
    mapping(address => GameState) public playerStates;
    
    event DecisionMade(address indexed player, uint256 chapterId, uint256 decisionId, uint256 tokensBurned);
    event GameStarted(address indexed player);
    event ChapterCompleted(address indexed player, uint256 chapterId);
    
    constructor(address _gameToken, uint256 _decisionCost) {
        gameToken = GameToken(_gameToken);
        decisionCost = _decisionCost;
    }
    
    /**
     * @dev Start a new game for the player
     */
    function startGame() public {
        require(!playerStates[msg.sender].gameStarted, "Game already started");
        
        playerStates[msg.sender].gameStarted = true;
        playerStates[msg.sender].currentChapter = 1;
        playerStates[msg.sender].currentScene = 1;
        
        emit GameStarted(msg.sender);
    }
    
    /**
     * @dev Make a decision in the game by burning tokens
     * @param chapterId The current chapter ID
     * @param decisionId The decision being made
     */
    function makeDecision(uint256 chapterId, uint256 decisionId) public {
        require(playerStates[msg.sender].gameStarted, "Game not started");
        require(playerStates[msg.sender].currentChapter == chapterId, "Invalid chapter");
        require(gameToken.balanceOf(msg.sender) >= decisionCost, "Insufficient tokens");
        
        // Burn tokens for making the decision
        gameToken.burnFrom(msg.sender, decisionCost);
        
        // Record the decision
        playerStates[msg.sender].decisions[chapterId] = decisionId;
        playerStates[msg.sender].totalDecisions++;
        
        emit DecisionMade(msg.sender, chapterId, decisionId, decisionCost);
    }
    
    /**
     * @dev Progress to the next scene
     */
    function progressScene() public {
        require(playerStates[msg.sender].gameStarted, "Game not started");
        playerStates[msg.sender].currentScene++;
    }
    
    /**
     * @dev Complete chapter and move to next
     */
    function completeChapter() public {
        require(playerStates[msg.sender].gameStarted, "Game not started");
        
        uint256 currentChapter = playerStates[msg.sender].currentChapter;
        playerStates[msg.sender].currentChapter++;
        playerStates[msg.sender].currentScene = 1;
        
        emit ChapterCompleted(msg.sender, currentChapter);
    }
    
    /**
     * @dev Get player's current game state
     */
    function getPlayerState(address player) public view returns (
        uint256 currentChapter,
        uint256 currentScene,
        uint256 totalDecisions,
        bool gameStarted
    ) {
        GameState storage state = playerStates[player];
        return (
            state.currentChapter,
            state.currentScene,
            state.totalDecisions,
            state.gameStarted
        );
    }
    
    /**
     * @dev Get player's decision for a specific chapter
     */
    function getPlayerDecision(address player, uint256 chapterId) public view returns (uint256) {
        return playerStates[player].decisions[chapterId];
    }
}
