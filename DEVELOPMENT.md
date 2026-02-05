# Game Development Guide

## Overview
BersGame is a complete blockchain-powered visual novel implementation featuring:
- Interactive storytelling with branching narratives
- Game of Thrones-inspired content
- NFT minting for game achievements
- Web3 wallet integration

## Game Design

### Story Structure
The game follows a branching narrative model where player choices lead to different outcomes:

```
                    START
                      |
        +-------------+-------------+
        |             |             |
    Throne      Night King    Independence
      Path         Path           Path
        |             |             |
    [Choices]    [Choices]     [Choices]
        |             |             |
    [Endings]    [Endings]     [Endings]
```

### Endings
1. **Iron Throne (ID: 0)** - Diplomatic conquest and wise rule
2. **Free Kingdom (ID: 1)** - Independence and self-governance
3. **Exile's Fate (ID: 2)** - Tyranny leads to downfall
4. **Savior of the Realm (ID: 3)** - Defeat supernatural threats

## Technical Architecture

### Frontend (Next.js)
- **Pages**: Single page application with dynamic content
- **State Management**: React hooks for game state
- **Styling**: CSS Modules for component-scoped styles
- **Responsive**: Mobile-first design approach

### Smart Contract (Solidity)
- **Standard**: ERC721 (OpenZeppelin)
- **Features**:
  - Unique token ID for each minted ending
  - Player achievement tracking
  - Duplicate minting prevention
  - Owner-controlled metadata

### Web3 Integration
- **Provider**: ethers.js v6
- **Wallet**: MetaMask support
- **Network**: Configurable (local/testnet/mainnet)

## Key Files Explained

### `lib/storyData.js`
Contains all story content, choices, and branching logic. Each story node includes:
- `id`: Unique identifier
- `text`: Story content
- `image`: Visual reference
- `choices`: Array of options (for non-endings)
- `ending`: Boolean flag
- `endingId`: NFT identifier for endings
- `endingTitle`: Display name for achievements

### `contracts/EndingNFT.sol`
ERC721 NFT contract with custom features:
- `mintEnding(uint256 endingId)`: Mint achievement NFT
- `hasPlayerMintedEnding()`: Check duplicate prevention
- `getPlayerEndings()`: View achievement history
- `setEndingURI()`: Owner sets metadata (IPFS links)

### `pages/index.js`
Main game component handling:
- Story progression
- Player choices
- Wallet connection
- NFT minting UI
- Game state management

### `lib/contract.js`
Web3 utilities for:
- Wallet connection
- Smart contract interaction
- Transaction handling
- Error management

## Development Workflow

### Local Development
1. **Terminal 1**: Run Hardhat node
   ```bash
   npm run node
   ```

2. **Terminal 2**: Deploy contract
   ```bash
   npm run deploy:local
   ```
   Copy the contract address from output

3. **Update Config**: Edit `lib/contract.js`
   ```javascript
   export const CONTRACT_ADDRESS = "0x...";
   ```

4. **Terminal 3**: Start Next.js
   ```bash
   npm run dev
   ```

### MetaMask Configuration
1. Add network: localhost:8545
2. Import test account from Hardhat
3. Connect to the application

## Extending the Game

### Adding New Story Nodes
Edit `lib/storyData.js`:
```javascript
new_node: {
  id: "new_node",
  text: "Your story text here",
  image: "/images/scene.jpg",
  choices: [
    { text: "Choice 1", nextId: "next_node_1" },
    { text: "Choice 2", nextId: "next_node_2" }
  ]
}
```

### Adding New Endings
1. Add ending node in `storyData.js` with `ending: true`
2. Deploy updated contract or call `setEndingURI(newId, uri)`
3. Update `endings` array in `storyData.js`

### Customizing Styles
Edit `styles/Game.module.css` to change:
- Color scheme
- Typography
- Layout
- Animations
- Responsive breakpoints

## Deployment Considerations

### Smart Contract
- Test thoroughly on testnets (Sepolia, Mumbai)
- Verify contract on block explorers
- Set all ending URIs before going live
- Consider gas optimization for mainnet

### Frontend
- Build optimized production bundle
- Deploy to Vercel/Netlify
- Set environment variables for contract addresses
- Configure proper RPC endpoints

### NFT Metadata
- Host metadata on IPFS
- Include proper JSON structure:
  ```json
  {
    "name": "Ending Name",
    "description": "Achievement description",
    "image": "ipfs://...",
    "attributes": [...]
  }
  ```

## Security Considerations

### Smart Contract
- Owner-only functions for critical operations
- Reentrancy protection (OpenZeppelin)
- Input validation on all functions
- Event emission for transparency

### Frontend
- Validate all user inputs
- Handle wallet disconnection gracefully
- Implement proper error boundaries
- Rate limiting for API calls

## Testing

### Contract Tests
```bash
npm test
```
Tests cover:
- Deployment
- Minting logic
- Access control
- Edge cases

### Frontend Testing
- Manual testing of all story paths
- Wallet integration testing
- NFT minting flow
- Error handling scenarios

## Troubleshooting

### Common Issues

**"Cannot connect to wallet"**
- Ensure MetaMask is installed
- Check network configuration
- Verify contract address is correct

**"Transaction failed"**
- Check gas settings
- Verify wallet has sufficient balance
- Ensure contract is deployed

**"Already minted this ending"**
- Each ending can only be minted once per address
- This is intentional achievement tracking

## Future Enhancements

### Potential Features
- [ ] More complex branching (relationship tracking)
- [ ] Save/load game progress
- [ ] Soundtrack and audio effects
- [ ] Animated scene transitions
- [ ] Multiplayer choices
- [ ] Achievement rarity system
- [ ] NFT marketplace integration
- [ ] Mobile native app version

### Community Contributions
- Additional story paths
- Translations
- Theme variants
- Character artwork
- Sound design

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Guide](https://hardhat.org/getting-started/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [IPFS Best Practices](https://docs.ipfs.tech/concepts/)
