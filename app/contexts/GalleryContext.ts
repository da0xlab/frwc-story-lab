import { createContext, useContext } from "react";

export enum GalleryDisplayMode {
  ByCollection = "grouped",
  Combined = "flat",
  Slideshow = "slideshow",
}

type GalleryContextType = {
  wallets: string[];
  setWallets: (wallets: string[]) => void;

  collections: string[];
  setCollections: (collections: string[]) => void;

  displayMode: GalleryDisplayMode;
  setDisplayMode: (displayMode: GalleryDisplayMode) => void;

  itemSize: number;
  setItemSize: (size: number) => void;
};

export const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if(context === undefined) {
    throw new Error();
  }
  return context;
}
