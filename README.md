# BersGame - Blockchain Visual Novel

A Game of Thrones-inspired visual novel where players make choices that lead to different endings. Each ending can be minted as an ERC721 NFT!

## Features

- 🎮 Interactive visual novel with branching storylines
- 🎭 Multiple endings inspired by Game of Thrones
- 🎨 Mint your endings as unique ERC721 NFTs
- 💼 Web3 wallet integration (MetaMask)
- 🔗 Built on Ethereum blockchain

## Game Endings

1. **The Iron Throne** - Conquer and rule the Seven Kingdoms
2. **The Free Kingdom** - Establish an independent kingdom
3. **The Exile's Fate** - Face betrayal and exile
4. **Savior of the Realm** - Defeat the Night King and save humanity

## Technology Stack

- **Frontend**: Next.js, React
- **Smart Contracts**: Solidity, Hardhat
- **Web3**: ethers.js
- **NFT Standard**: ERC721 (OpenZeppelin)

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- MetaMask browser extension
- Git

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

### Local Development

1. Start a local Hardhat node:
```bash
npm run node
```

2. In a new terminal, deploy the smart contract:
```bash
npm run deploy:local
```

3. Copy the deployed contract address and update it in `lib/contract.js`

4. Start the Next.js development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

6. Connect MetaMask to localhost:8545

## How to Play

1. Connect your MetaMask wallet
2. Make choices to navigate through the story
3. Reach one of the four unique endings
4. Mint your ending as an NFT to commemorate your journey
5. Play again to discover other endings!

## Smart Contract

The `EndingNFT` contract allows players to:
- Mint ending NFTs when they complete the game
- Prevent duplicate minting of the same ending
- Track all endings collected by each player
- Store unique metadata for each ending type

## Project Structure

```
bersgame/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment scripts
├── test/              # Contract tests
├── pages/             # Next.js pages
├── components/        # React components
├── lib/               # Utility functions and game data
├── styles/            # CSS styles
└── public/            # Static assets
```

## License

ISC

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
