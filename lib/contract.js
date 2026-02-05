import { ethers } from 'ethers';

// Contract ABI (simplified - only functions we need)
const CONTRACT_ABI = [
  "function mintEnding(uint256 endingId) external",
  "function hasPlayerMintedEnding(address player, uint256 endingId) external view returns (bool)",
  "function getPlayerEndings(address player) external view returns (uint256[])",
  "function totalSupply() external view returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
];

// Replace with your deployed contract address
// For local development, this will be set after deployment
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask to use this feature');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    return {
      address: accounts[0],
      provider,
      signer,
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function mintEndingNFT(endingId, signer) {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.mintEnding(endingId);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}

export async function hasPlayerMintedEnding(endingId, address, provider) {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    return await contract.hasPlayerMintedEnding(address, endingId);
  } catch (error) {
    console.error('Error checking minted ending:', error);
    throw error;
  }
}

export async function getPlayerEndings(address, provider) {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const tokenIds = await contract.getPlayerEndings(address);
    return tokenIds.map(id => id.toString());
  } catch (error) {
    console.error('Error getting player endings:', error);
    throw error;
  }
}
