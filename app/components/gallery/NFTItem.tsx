import { useModalContext } from "@/app/contexts/ModalContext";
import { NFT } from "@/app/hooks/useOwnedNFTs";
import styled from "styled-components";

const NFTItem = ({ width, nft }: { width?: number | undefined; nft: NFT }) => {
  const { setModalItem } = useModalContext();
  const image = nft?.image.originalUrl;

  if (!image) {
    return null;
  }

  return (
    <ItemIcon
      src={image}
      $itemWidth={width}
      onClick={() => {
        setModalItem(nft);
      }}
    />
  );
};

export default NFTItem;

const ItemIcon = styled.img<{ $itemWidth: number | undefined }>`
  cursor: pointer;

  width: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};
  height: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};

  object-fit: contain;
  image-rendering: pixelated;
  aspect-ratio: 1;
`;
