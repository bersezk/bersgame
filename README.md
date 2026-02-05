# BersGame

A blockchain-powered visual novel where every decision costs tokens that are burned forever.

## 🎮 Concept

BersGame is an innovative visual novel game built on blockchain technology where:
- Players must burn tokens to make every decision
- Each choice permanently removes tokens from circulation
- Tokens are limited, making every decision meaningful and permanent
- The story branches based on player choices

## 🌟 Features

- **Token Burning Mechanism**: Every decision costs 10 BERS tokens that are permanently burned
- **Interactive Story**: Multiple paths and endings based on your choices
- **Blockchain Integration**: Built with Solidity smart contracts (Ethereum/EVM compatible)
- **Web3 Ready**: Designed to integrate with MetaMask and other Web3 wallets
- **Scarcity Economy**: Limited tokens create meaningful decision-making

## 🏗️ Project Structure

```
bersgame/
├── contracts/              # Solidity smart contracts
│   ├── GameToken.sol      # ERC20 token contract
│   └── VisualNovel.sol    # Main game logic contract
├── scripts/               # Deployment scripts
│   └── deploy.js         # Contract deployment
├── test/                  # Smart contract tests
│   └── VisualNovel.test.js
├── public/                # Frontend application
│   └── index.html        # Playable demo
└── hardhat.config.js     # Hardhat configuration
```

## 📋 Smart Contracts

### GameToken.sol
ERC20 token contract with burning functionality:
- **Name**: BersGame Token
- **Symbol**: BERS
- **Initial Supply**: 1,000,000 BERS
- **Features**: Minting (owner only), burning

### VisualNovel.sol
Main game contract that manages:
- Game state tracking per player
- Decision recording
- Token burning on each decision
- Chapter/scene progression
- Event logging for decisions and achievements

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- MetaMask browser extension (for blockchain version)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bersezk/bersgame.git
cd bersgame
```

2. Install dependencies:
```bash
npm install
```

3. Compile smart contracts:
```bash
npx hardhat compile
```

4. Run tests:
```bash
npx hardhat test
```

### Playing the Demo

Open `public/index.html` in a web browser to play the demo version.

The demo simulates the blockchain functionality without requiring a Web3 wallet:
- Start with 100 BERS tokens
- Each decision costs 10 BERS tokens
- Navigate through Chapter 1 of the story
- Multiple paths lead to different outcomes

## 🌐 Deploy to Vercel

Deploy the game to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bersezk/bersgame)

Or follow the [detailed deployment guide](VERCEL_DEPLOYMENT.md) for step-by-step instructions.

**Quick Deploy Steps:**
1. Push to GitHub (already done)
2. Import project in Vercel
3. Set output directory to `public`
4. Deploy!

Your game will be live on a global CDN with automatic HTTPS.

## 🔗 Blockchain Deployment

### Local Development

1. Start a local Hardhat node:
```bash
npx hardhat node
```

2. Deploy contracts to local network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment

1. Configure your network in `hardhat.config.js`
2. Set up your deployer wallet private key
3. Deploy:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## 🎯 Game Mechanics

### Token Economics
- **Starting Balance**: Players receive 1000 BERS tokens
- **Decision Cost**: 10 BERS per decision
- **Burning**: Tokens are permanently removed from circulation
- **Maximum Decisions**: ~100 decisions per game (with starting balance)

### Gameplay Flow
1. Player starts a new game
2. Story scene is presented with choices
3. Player selects a choice (costs 10 BERS)
4. Tokens are burned (permanent transaction)
5. Story progresses based on choice
6. Repeat until chapter completion or token depletion

### Smart Contract Functions

```solidity
// Start a new game
function startGame() public

// Make a decision (burns tokens)
function makeDecision(uint256 chapterId, uint256 decisionId) public

// Progress through scenes
function progressScene() public

// Complete chapter
function completeChapter() public

// View game state
function getPlayerState(address player) public view returns (...)
```

## 🛠️ Development

### Adding New Chapters

Edit the `story` object in `public/index.html` to add new chapters and scenes:

```javascript
const story = {
    1: {
        title: "Chapter 1 - The Beginning",
        scenes: [
            {
                image: "🏰",
                character: "Narrator",
                text: "Your story text here...",
                choices: [
                    {
                        text: "Choice text",
                        nextScene: 1
                    }
                ]
            }
        ]
    }
};
```

### Customizing Token Cost

Modify the `decisionCost` parameter when deploying the VisualNovel contract:

```javascript
const decisionCost = hre.ethers.parseEther("10"); // 10 BERS per decision
```

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

Tests cover:
- Token minting and transfers
- Game initialization
- Decision making and token burning
- State progression
- Error conditions

## 📜 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔮 Future Enhancements

- [ ] Multiple chapter support
- [ ] NFT achievements for completing chapters
- [ ] Multiplayer decision-making
- [ ] Token staking for premium content
- [ ] Community-created stories
- [ ] Cross-chain compatibility
- [ ] Mobile app version
- [ ] Save/load game states

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Visit the project repository

---

Built with ❤️ using Solidity, Hardhat, and Web3 technologies

