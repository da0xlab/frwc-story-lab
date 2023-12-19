"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import styled from "styled-components";

import NFTCollection from "./components/NFTCollection";
import NFTSlideShow from "./components/NFTSlideshow";

import { GalleryContext, GalleryDisplayMode } from "./contexts/GalleryContext";
import useOwnedNFTs from "./hooks/useOwnedNFTs";
import PickersPanel from "./components/PickersPanel";

const warriorsAddress = "0x9690b63Eb85467BE5267A3603f770589Ab12Dc95";
const wizardsAddress = "0x521f9C7505005CFA19A8E5786a9c3c9c9F5e6f42";
const soulsAddress = "0x251b5F14A825C537ff788604eA1b58e49b70726f";
const poniesAddress = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
const spawnAddress = "0x7de11a2d9e9727fa5ead3094e40211c5e9cf5857";
const veilAddress = "0x31158181b4b91a423bfdc758fc3bf8735711f9c5";
const ringsAddress = "0x5d4aa6ff9de7963ead5a17b454dc1093ca9e98e7";
const athenaeumAddress = "0x7c104b4db94494688027cced1e2ebfb89642c80f";

const defaultCollections = [
  wizardsAddress,
  warriorsAddress,
  soulsAddress,
  poniesAddress,
  spawnAddress,
  veilAddress,
  ringsAddress,
  athenaeumAddress,
];

const defaultItemWidth = "200";

const defaultWallets = [
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
  let walletAddresses = searchParams.getAll("wallet");
  if (walletAddresses.length === 0) {
    walletAddresses = defaultWallets;
  }
  // Collection(s)
  let collectionAddresses = searchParams.getAll("collection");
  if (collectionAddresses.length === 0) {
    collectionAddresses = defaultCollections;
  }

  // State
  const [selectedDisplayMode, setDisplayMode] = useState(display);
  const [selectedWallets, setWallets] = useState(walletAddresses);
  const [selectedCollections, setCollections] = useState(collectionAddresses);
  const [itemSize, setItemSize] = useState(width);

  // Fetch portfolio
  const { tokens, isLoading } = useOwnedNFTs(
    walletAddresses,
    collectionAddresses
  );

  // Sort collections by preferred order
  const sortedCollections = Object.entries(tokens)
    // .sort(
    //   (a, b) =>
    //     defaultCollections.indexOf(b[0]) - defaultCollections.indexOf(a[0])
    // )
    .filter((t) => selectedCollections.includes(t[0]));

  console.log(sortedCollections);

  // All owned collections, for collection picker
  const ownedCollections = Object.values(tokens)
    .flatMap((t) => (t[0].contract ? t[0].contract : []))
    // .sort(
    //   (a, b) =>
    //     defaultCollections.indexOf(a.address) -
    //     defaultCollections.indexOf(b.address)
    // );

  console.log(ownedCollections);

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
        wallets: selectedWallets,
        setWallets,
        collections: selectedCollections,
        setCollections,
        itemSize,
        setItemSize,
      }}
    >
      <Container>
        <PickersPanel
          walletAddresses={walletAddresses}
          ownedCollections={ownedCollections}
        />

        {selectedDisplayMode === GalleryDisplayMode.Combined && (
          <NFTCollection
            nfts={sortedCollections
              .map((c) => c[1])
              .flat()
              .filter((t) => selectedWallets.includes(t.owner))}
            itemWidth={itemSize}
          />
        )}
        {selectedDisplayMode === GalleryDisplayMode.ByCollection &&
          sortedCollections.map(([collectionAddress, tokens]) => {
            return (
              <NFTCollection
                nfts={tokens.filter((t) => selectedWallets.includes(t.owner))}
                key={collectionAddress}
                itemWidth={itemSize}
              />
            );
          })}
        {selectedDisplayMode === GalleryDisplayMode.Slideshow && (
          <NFTSlideShow
            nfts={sortedCollections
              .flatMap((c) => c[1])
              .filter((t) => selectedWallets.includes(t.owner))}
            interval={1000}
          />
        )}
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
