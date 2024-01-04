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

  return (
    <>
      {displayMode !== GalleryDisplayMode.Slideshow && (
        <SettingsButton
          $sticky={settingsVisible}
          onClick={() => setSettingsVisible(!settingsVisible)}
        >
          {settingsVisible ? "Hide" : "Show"} Settings
        </SettingsButton>
      )}
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

const SettingsButton = styled.button<{ $sticky: boolean }>`
  position: ${(props) => (props.$sticky ? "fixed" : "relative")};
  margin: 1em;
  z-index: 1;
`;

export default NFTGallery;
