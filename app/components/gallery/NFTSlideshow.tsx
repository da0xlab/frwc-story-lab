import { useEffect, useState } from "react";
import NFTItem from "./NFTItem";
import { NFT } from "@/app/hooks/useOwnedNFTs";
import styled from "styled-components";
import {
  GalleryDisplayMode,
  useGalleryContext,
} from "@/app/contexts/GalleryContext";

function NFTSlideShow({ interval, nfts }: { interval: number; nfts: NFT[] }) {
  const [current, setCurrent] = useState(0);

  const { setDisplayMode } = useGalleryContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (current === nfts.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, interval);
    return () => clearInterval(intervalId);
  }, [current, interval, nfts.length]);

  if (!nfts || nfts.length === 0) {
    return null;
  }

  return (
    <Container>
      <Button
        onClick={() => {
          setDisplayMode(GalleryDisplayMode.ByCollection);
        }}
      >
        End Slideshow
      </Button>
      <NFTItem nft={nfts[current]} />
    </Container>
  );
}

const Button = styled.button`
  top: 0;
  left: 0;
  margin: 2em;
  position: absolute;
  display: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  &:hover ${Button} {
    display: block;
  }
`;

export default NFTSlideShow;
