# Quick Start Guide

## Playing the Demo (No Blockchain Required)

The easiest way to experience BersGame is through the demo:

1. Open `public/index.html` in any modern web browser
2. Click "Start Adventure"
3. Make decisions by clicking on choices (each costs 10 BERS tokens)
4. Watch your token balance decrease as you progress through the story
5. Try to complete Chapter 1 before running out of tokens!

## Running the Demo Locally with a Web Server

```bash
# Using Python 3
cd public
python3 -m http.server 8080

# Or using Node.js
npx http-server public -p 8080

# Then open http://localhost:8080 in your browser
```

## Understanding the Game

- **Starting Balance**: 100 BERS tokens
- **Decision Cost**: 10 BERS per choice (burned permanently)
- **Maximum Decisions**: ~10 decisions per playthrough
- **Multiple Paths**: Different choices lead to different story outcomes
- **Token Economy**: Simulates blockchain token burning without requiring Web3 wallet

## Blockchain Version (Future)

To deploy and play the full blockchain version:

1. Install dependencies: `npm install`
2. Compile contracts: `npm run compile`
3. Run tests: `npm test`
4. Deploy to local network: `npm run node` (in one terminal), then `npm run deploy:local` (in another)
5. Connect your Web3 wallet to interact with the deployed contracts

## Game Features

### Current Demo Features
✅ Interactive visual novel story  
✅ Token burning simulation  
✅ Multiple story paths  
✅ Decision tracking  
✅ Beautiful UI with animations  
✅ Chapter completion system  

### Blockchain Features (Contracts Ready)
🔗 ERC20 BERS token  
🔗 On-chain game state  
🔗 Permanent decision recording  
🔗 Token burning via smart contract  
🔗 Player progress tracking  

## Story Structure

Chapter 1 features:
- 8 unique scenes
- 2 initial paths (main gate or secret entrance)
- Multiple decision points affecting the story
- Different endings based on your choices
- Approximately 10-15 minutes of gameplay

## Tips for Playing

1. **Think Before You Choose**: You only have 100 tokens!
2. **Explore Different Paths**: Try both the main gate and secret entrance
3. **Watch Your Balance**: Keep an eye on your remaining BERS tokens
4. **Learn from Mistakes**: Some choices lead to dead ends - play again to find the optimal path
5. **Complete the Chapter**: Try to reach the throne room with tokens to spare

## Technical Details

The demo uses:
- Pure HTML/CSS/JavaScript (no frameworks)
- No external dependencies for the frontend
- Simulated blockchain logic
- Client-side state management
- Responsive design for all screen sizes

Enjoy your adventure! 🎭🏰⚔️
