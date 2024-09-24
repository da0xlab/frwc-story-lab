import { defaultCollections } from "@/app/hooks/useOwnedNFTs";
import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import NFTCollection from "./NFTCollection";
import NFTSlideShow from "./NFTSlideshow";
import styled from "styled-components";
import { useState } from "react";
import StoryBuilder from "./StoryBuilder";
import PickersPanel from "../pickers/PickersPanel";

function NFTGallery() {
  const {
    displayMode,
    ownedNFTs,
    ownedCollections,
    itemSize,
    selectedWallets,
    selectedCollections,
    settingsVisible,
    setSettingsVisible,
    showCollectionTitles,
  } = useGalleryContext();

  const [isStoryBuilderActive, setIsStoryBuilderActive] = useState(false);

  const collectionsToDisplay = ownedCollections
    .map((c) => c.address)
    .filter((a) => selectedCollections.includes(a));
  const tokensToDisplay = Object.values(ownedNFTs)
    .flat()
    .filter(
      (t) =>
        selectedWallets.includes(t.owner) &&
        selectedCollections.includes(t.contract.address)
    )
    .sort((a, b) =>
      defaultCollections.indexOf(b.contract.address) >
      defaultCollections.indexOf(a.contract.address)
        ? -1
        : 1
    );

  function share() {
    const query = new URLSearchParams();
    selectedWallets.forEach((wallet) => query.append("wallet", wallet));
    query.append("display", displayMode);
    query.append("size", itemSize.toString());
    open(`?${query.toString()}`);
  }

  const handleDragStart = (e: any, nft: any) => {
    e.dataTransfer.setData("nft", JSON.stringify(nft));
  };

  // Filter to only include NFTs where isCharacter is true
  const availableCharacters = Object.values(ownedNFTs)
  .flat()


  return (
    <>
      {
        <ButtonsPanel>
          {!settingsVisible && <StoryBuilderButton onClick={() => setIsStoryBuilderActive(!isStoryBuilderActive)}>
            {isStoryBuilderActive ? "Close" : "Open"} Story Builder
          </StoryBuilderButton>}
          <SettingsButton
            $sticky={settingsVisible}
            onClick={() => setSettingsVisible(!settingsVisible)}
          >
            {settingsVisible ? "Hide" : "Show"} Settings
          </SettingsButton>          
        </ButtonsPanel>
      }
      {settingsVisible && <PickersPanel />}

      {isStoryBuilderActive && <StoryBuilder availableCharacters={availableCharacters} />}
      {displayMode === GalleryDisplayMode.Combined && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {tokensToDisplay.map((nft, index) => (
            <div
              key={`${nft.contract.address}-${index}`} // Ensure each NFT has a unique key
              draggable
              onDragStart={(e) => handleDragStart(e, nft)}
            >
              <NFTCollection nfts={[nft]} itemWidth={itemSize} />
            </div>
          ))}
        </div>
      )}
      {displayMode === GalleryDisplayMode.ByCollection &&
        collectionsToDisplay.map((collectionAddress) => {
          const tokens = tokensToDisplay.filter(
            (nft) => nft.contract.address === collectionAddress
          );
          return (
            <div key={`collection-${collectionAddress}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
              {tokens.map((nft, index) => (
                <div
                  key={`${collectionAddress}-${index}`} // Ensure each NFT has a unique key
                  draggable
                  onDragStart={(e) => handleDragStart(e, nft)}
                >
                  <NFTCollection
                    title={showCollectionTitles ? nft.collection?.name : undefined}
                    nfts={[nft]}
                    itemWidth={itemSize}
                  />
                </div>
              ))}
            </div>
          );
        })}

      
    </>
  );
}

const ButtonsPanel = styled.div`
  width: 100vw;
  
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  justify-content: space-between;

  position: fixed;
  z-index: 10;
  background-color: black; /* Or any color that matches the gallery background */

`;

const SettingsButton = styled.button<{ $sticky: boolean }>`
  margin: 1em;
  position: ${(props) => (props.$sticky ? "fixed" : "relative")};
  z-index: 3;
`;

const ShareButton = styled.button`
  margin: 1em;
`;

const StoryBuilderButton = styled.button`
  margin: 1em;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 2px;
  z-index: 3;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export default NFTGallery;
