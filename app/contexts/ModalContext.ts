import { createContext, useContext } from "react";
import { NFT } from "../hooks/useOwnedNFTs";

type ModalContextType = {
  modalItem?: NFT;
  setModalItem: (item?: NFT) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
