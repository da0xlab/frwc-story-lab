import { NftContractForNft } from "alchemy-sdk";
import { createContext, useContext } from "react";
import { NFTsByContract } from "../hooks/useOwnedNFTs";

export enum GalleryDisplayMode {
  ByCollection = "grouped",
  Combined = "flat",
  Slideshow = "slideshow",
}

type GalleryContextType = {
  selectedWallets: string[];
  setSelectedWallets: (wallets: string[]) => void;
  allWallets: string[];
  setAllWallets: (wallets: string[]) => void;

  selectedCollections: string[];
  setSelectedCollections: (collections: string[]) => void;

  ownedCollections: NftContractForNft[];
  ownedNFTs: NFTsByContract;

  displayMode: GalleryDisplayMode;
  setDisplayMode: (displayMode: GalleryDisplayMode) => void;

  itemSize: number;
  setItemSize: (size: number) => void;
};

export const GalleryContext = createContext<GalleryContextType | undefined>(
  undefined
);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
