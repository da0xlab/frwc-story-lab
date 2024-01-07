import { defaultCollections } from "@/app/hooks/useOwnedNFTs";
import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import NFTCollection from "./NFTCollection";
import NFTSlideShow from "./NFTSlideshow";
import styled from "styled-components";
import PickersPanel from "../pickers/PickersPanel";

function NFTGallery() {
  const {
    displayMode,
    ownedNFTs,
    itemSize,
    selectedWallets,
    selectedCollections,
    settingsVisible,
    setSettingsVisible,
    showCollectionTitles,
  } = useGalleryContext();

  const tokensToDisplay = Object.values(ownedNFTs)
    .flat()
    .filter(
      (t) =>
        selectedWallets.includes(t.owner) &&
        selectedCollections.includes(t.contract.address)
    )
    .sort((a, b) =>
      defaultCollections
        .map((a) => a.toLowerCase())
        .indexOf(b.contract.address.toLowerCase()) >
      defaultCollections
        .map((a) => a.toLowerCase())
        .indexOf(a.contract.address.toLowerCase())
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

  return (
    <>
      <ButtonsPanel>
        {displayMode !== GalleryDisplayMode.Slideshow && (
          <SettingsButton
            $sticky={settingsVisible}
            onClick={() => setSettingsVisible(!settingsVisible)}
          >
            {settingsVisible ? "Hide" : "Show"} Settings
          </SettingsButton>
        )}
        <ShareButton onClick={share}>Open share URL</ShareButton>
      </ButtonsPanel>
      {settingsVisible && <PickersPanel />}

      {displayMode === GalleryDisplayMode.Combined && (
        <NFTCollection nfts={tokensToDisplay} itemWidth={itemSize} />
      )}
      {displayMode === GalleryDisplayMode.ByCollection &&
        selectedCollections.map((collectionAddress) => {
          const tokens = tokensToDisplay.filter(
            (nft) => nft.contract.address === collectionAddress
          );
          return (
            <NFTCollection
              title={
                showCollectionTitles ? tokens[0]?.collection?.name : undefined
              }
              nfts={tokens}
              key={collectionAddress}
              itemWidth={itemSize}
            />
          );
        })}
      {displayMode === GalleryDisplayMode.Slideshow && (
        <NFTSlideShow nfts={tokensToDisplay} interval={1000} />
      )}
    </>
  );
}

const ButtonsPanel = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  justify-content: space-between;
`;

const SettingsButton = styled.button<{ $sticky: boolean }>`
  margin: 1em;
  position: ${(props) => (props.$sticky ? "fixed" : "relative")};
  z-index: 1;
`;

const ShareButton = styled.button`
  margin: 1em;
`;

export default NFTGallery;
