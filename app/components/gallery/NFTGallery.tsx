import { defaultCollections } from "@/app/hooks/useOwnedNFTs";
import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import NFTCollection from "./NFTCollection";
import NFTSlideShow from "./NFTSlideshow";

function NFTGallery() {
  const {
    displayMode,
    ownedNFTs,
    itemSize,
    selectedWallets,
    selectedCollections,
  } = useGalleryContext();

  // TODO: Vars and sorting
  // Sort collections by preferred order
  // const sortedCollections = Object.entries(tokens)
  // .sort(
  //   (a, b) =>
  //     defaultCollections.indexOf(b[0]) - defaultCollections.indexOf(a[0])
  // )
  // .filter((t) => selectedCollectionAddresses.includes(t[0]));

  // console.log(sortedCollections);
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
      {displayMode === GalleryDisplayMode.Combined && (
        <NFTCollection nfts={tokensToDisplay} itemWidth={itemSize} />
      )}
      {displayMode === GalleryDisplayMode.ByCollection &&
        selectedCollections.map((collectionAddress) => {
          return (
            <NFTCollection
              nfts={tokensToDisplay.filter(
                (nft) => nft.contract.address === collectionAddress
              )}
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

export default NFTGallery;
