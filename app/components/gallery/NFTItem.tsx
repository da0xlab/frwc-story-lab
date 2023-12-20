import { OwnedNft } from "alchemy-sdk";
import styled from "styled-components";

const NFTItem = ({
  width,
  nft,
}: {
  width?: number | undefined;
  nft: OwnedNft;
}) => {
  const image = nft?.image.cachedUrl;

  if (!image) {
    return null;
  }

  return <ItemIcon src={image} $itemWidth={width} />;
};

export default NFTItem;

const ItemIcon = styled.img<{ $itemWidth: number | undefined }>`
  width: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};
  height: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};

  object-fit: contain;
  image-rendering: pixelated;

  /* border-radius: 0.75em; */
`;
