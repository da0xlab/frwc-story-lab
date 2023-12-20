"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import styled from "styled-components";

import { GalleryContext, GalleryDisplayMode } from "./contexts/GalleryContext";
import useOwnedNFTs, { defaultCollections } from "./hooks/useOwnedNFTs";
import PickersPanel from "./components/pickers/PickersPanel";
import { NftContractForNft } from "alchemy-sdk";
import NFTGallery from "./components/gallery/NFTGallery";

const defaultItemWidth = "200";

const defaultWallets: string[] = [
  "0x73eFDa13bC0d0717b4f2f36418279FD4E2Cd0Af9",
  "0x0e2CE9123ef30142f8ef8365ea2CBea06596E482",
];

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
  if (walletAddrs.length === 0) {
    walletAddrs = defaultWallets;
  }
  // Collection(s)
  let collectionAddrs = searchParams.getAll("collection");
  if (collectionAddrs.length === 0) {
    collectionAddrs = defaultCollections;
  }

  // Display mode
  const [selectedDisplayMode, setDisplayMode] = useState(display);
  // All wallets
  const [wallets, setWallets] = useState(walletAddrs);
  // Selected wallets to display
  const [selectedWallets, setSelectedWallets] = useState(walletAddrs);
  // Selected collections to display
  const [selectedCollections, setSelectedCollections] =
    useState(collectionAddrs);
  // Item size in gallery
  const [itemSize, setItemSize] = useState(width);
  // Collections owned by all wallets
  const [ownedCollections, setOwnedCollections] = useState<NftContractForNft[]>(
    []
  );

  // Fetch portfolio
  const { tokens, isLoading } = useOwnedNFTs(wallets, collectionAddrs);

  useEffect(() => {
    const ownedCollections = Object.values(tokens)
      .flatMap((t) => (t[0].contract ? t[0].contract : []))
      .sort((a, b) =>
        defaultCollections.map(a => a.toLowerCase()).indexOf(a.address.toLowerCase()) >
        defaultCollections.map(a => a.toLowerCase()).indexOf(b.address.toLowerCase())
          ? 1
          : -1
      );
    setOwnedCollections(ownedCollections);
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
        allWallets: wallets,
        setAllWallets: setWallets,
        selectedCollections,
        setSelectedCollections,
        ownedCollections,
        ownedNFTs: tokens,
        itemSize,
        setItemSize,
      }}
    >
      <Container>
        <PickersPanel />
        <NFTGallery />
      </Container>
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
