import { useEffect, useState } from "react";
import NFTItem from "./NFTItem";
import { OwnedNft } from "alchemy-sdk";

function NFTSlideShow({
  interval,
  nfts,
}: {
  interval: number;
  nfts: OwnedNft[];
}) {
  const [current, setCurrent] = useState(0);

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

  return <NFTItem nft={nfts[current]} />;
}

export default NFTSlideShow;
