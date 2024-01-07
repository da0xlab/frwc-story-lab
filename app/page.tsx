"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import styled from "styled-components";

import { GalleryContext, GalleryDisplayMode } from "./contexts/GalleryContext";
import useOwnedNFTs, {
  NFT,
  defaultCollections,
  officialCollections,
} from "./hooks/useOwnedNFTs";
import PickersPanel from "./components/pickers/PickersPanel";
import { NftContractForNft } from "alchemy-sdk";
import NFTGallery from "./components/gallery/NFTGallery";
import { ModalContext } from "./contexts/ModalContext";
import NFTItemModal from "./components/modal/NFTItemModal";
import useSavedWallets from "./hooks/useSavedWallets";

const defaultItemWidth = "200";

export default function Index() {
  // Get query params
  const searchParams = useSearchParams();
  // Item size
  const width = parseInt(searchParams.get("size") ?? defaultItemWidth);
  // Display mode
  const display =
    (searchParams.get("display") as GalleryDisplayMode) ??
    GalleryDisplayMode.ByCollection;
  // Wallet(s)
  let walletAddrs = searchParams.getAll("wallet");

  // Load saved wallets
  const { savedWallets } = useSavedWallets();

  // Display mode
  const [selectedDisplayMode, setDisplayMode] = useState(display);
  // All wallets
  const [allWallets, setAllWallets] = useState(walletAddrs);
  // Selected wallets to display
  const [selectedWallets, setSelectedWallets] = useState(walletAddrs);
  // Selected collections to display
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  // Item size in gallery
  const [itemSize, setItemSize] = useState(width);
  // Collection titles
  const [showCollectionTitles, setShowCollectionTitles] = useState(false);
  // Pickers Panel visibility, visible on load if no wallet(s)
  const [settingsVisible, setSettingsVisible] = useState(
    selectedWallets.length === 0
  );
  // Item Modal
  const [modalItem, setModalItem] = useState<NFT | undefined>(undefined);
  // Collections owned by all wallets
  const [ownedCollections, setOwnedCollections] = useState<NftContractForNft[]>(
    []
  );

  // Handle when we get saved wallets from local storage
  useEffect(() => {
    if (walletAddrs.length === 0) {
      const newAllWallets = [...walletAddrs, ...savedWallets];
      setAllWallets(newAllWallets);
    }
  }, [savedWallets]);

  // Fetch portfolio
  const { tokens, isLoading } = useOwnedNFTs(allWallets, defaultCollections);

  // Process owned NFTs
  useEffect(() => {
    const ownedCollections = Object.values(tokens)
      .flatMap((t) => (t[0].contract ? t[0].contract : []))
      // Sort by preferred collection order
      .sort((a, b) =>
        defaultCollections
          .map((a) => a.toLowerCase())
          .indexOf(a.address.toLowerCase()) >
        defaultCollections
          .map((a) => a.toLowerCase())
          .indexOf(b.address.toLowerCase())
          ? 1
          : -1
      );
    setOwnedCollections(ownedCollections);
    setSelectedCollections(
      ownedCollections
        .map((c) => c.address)
        .filter((a) => officialCollections.includes(a))
    );
  }, [tokens]);

  if (isLoading) {
    return (
      <Container>
        <h1>Loading NFTs...</h1>
      </Container>
    );
  }

  return (
    <GalleryContext.Provider
      value={{
        displayMode: selectedDisplayMode,
        setDisplayMode,
        selectedWallets,
        setSelectedWallets,
        allWallets,
        setAllWallets,
        selectedCollections,
        setSelectedCollections,
        ownedCollections,
        ownedNFTs: tokens,
        itemSize,
        setItemSize,
        settingsVisible,
        setSettingsVisible,
        showCollectionTitles,
        setShowCollectionTitles,
      }}
    >
      <ModalContext.Provider value={{ modalItem, setModalItem }}>
        <Container>
          <NFTItemModal />
          <NFTGallery />
        </Container>
      </ModalContext.Provider>
    </GalleryContext.Provider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  background-color: #000;
  color: #fff;

  width: 100%;
  height: 100%;
`;
