import { useState, useEffect } from 'react';
import { storyData, endings } from '../lib/storyData';
import { connectWallet, mintEndingNFT, hasPlayerMintedEnding } from '../lib/contract';
import styles from '../styles/Game.module.css';

export default function Game() {
  const [currentStory, setCurrentStory] = useState(storyData.start);
  const [history, setHistory] = useState(['start']);
  const [wallet, setWallet] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [alreadyMinted, setAlreadyMinted] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const walletData = await connectWallet();
          setWallet(walletData);
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    }
  };

  const handleConnectWallet = async () => {
    try {
      const walletData = await connectWallet();
      setWallet(walletData);
    } catch (error) {
      alert('Failed to connect wallet: ' + error.message);
    }
  };

  const handleChoice = (nextId) => {
    const nextStory = storyData[nextId];
    setCurrentStory(nextStory);
    setHistory([...history, nextId]);
    setMintSuccess(false);
    setAlreadyMinted(false);
  };

  const handleRestart = () => {
    setCurrentStory(storyData.start);
    setHistory(['start']);
    setMintSuccess(false);
    setAlreadyMinted(false);
  };

  const handleMintNFT = async () => {
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }

    if (!currentStory.ending) {
      return;
    }

    setIsMinting(true);
    try {
      // Check if already minted
      const hasMinted = await hasPlayerMintedEnding(
        currentStory.endingId, 
        wallet.address, 
        wallet.provider
      );

      if (hasMinted) {
        setAlreadyMinted(true);
        setIsMinting(false);
        return;
      }

      await mintEndingNFT(currentStory.endingId, wallet.signer);
      setMintSuccess(true);
    } catch (error) {
      console.error('Minting error:', error);
      alert('Failed to mint NFT: ' + error.message);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>A Game of Choices</h1>
        <div className={styles.walletSection}>
          {wallet ? (
            <div className={styles.walletInfo}>
              <span className={styles.walletAddress}>
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
            </div>
          ) : (
            <button onClick={handleConnectWallet} className={styles.connectBtn}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.storyContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.imagePlaceholder}>
              {currentStory.image ? currentStory.image.split('/').pop().replace('.jpg', '') : 'Scene'}
            </div>
          </div>

          <div className={styles.textContainer}>
            <p className={styles.storyText}>{currentStory.text}</p>
          </div>

          {currentStory.ending ? (
            <div className={styles.endingContainer}>
              <h2 className={styles.endingTitle}>🏆 {currentStory.endingTitle}</h2>
              
              <div className={styles.endingActions}>
                {wallet && !mintSuccess && !alreadyMinted && (
                  <button 
                    onClick={handleMintNFT}
                    className={styles.mintBtn}
                    disabled={isMinting}
                  >
                    {isMinting ? 'Minting...' : '🎨 Mint Ending as NFT'}
                  </button>
                )}

                {mintSuccess && (
                  <div className={styles.successMessage}>
                    ✅ Successfully minted your ending as an NFT!
                  </div>
                )}

                {alreadyMinted && (
                  <div className={styles.infoMessage}>
                    ℹ️ You've already minted this ending!
                  </div>
                )}

                {!wallet && (
                  <div className={styles.infoMessage}>
                    Connect your wallet to mint this ending as an NFT
                  </div>
                )}

                <button onClick={handleRestart} className={styles.restartBtn}>
                  🔄 Play Again
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.choicesContainer}>
              {currentStory.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice.nextId)}
                  className={styles.choiceBtn}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {history.length > 1 && !currentStory.ending && (
          <button onClick={handleRestart} className={styles.restartBtnSmall}>
            Restart Story
          </button>
        )}
      </main>

      <footer className={styles.footer}>
        <p>A blockchain-powered visual novel experience</p>
      </footer>
    </div>
  );
}
