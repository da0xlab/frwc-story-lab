import { useModalContext } from "@/app/contexts/ModalContext";
import { NFT } from "@/app/hooks/useOwnedNFTs";
import { NftTokenType } from "alchemy-sdk";
import styled from "styled-components";

const NFTItem = ({ width, nft }: { width?: number | undefined; nft: NFT }) => {
  const { setModalItem } = useModalContext();
  const image = nft?.image.originalUrl;

  if (!image) {
    return null;
  }

  return (
    <Containter>
      <ItemIcon
        src={image}
        $itemWidth={width}
        onClick={() => {
          setModalItem(nft);
        }}
      />
      {parseInt(nft.balance) > 1 && (
        <Count>
          <CountLabel>{nft.balance}</CountLabel>
        </Count>
      )}
    </Containter>
  );
};

export default NFTItem;

const Containter = styled.div`
  /* position: relative; */
`;

const ItemIcon = styled.img<{ $itemWidth: number | undefined }>`
  cursor: pointer;

  width: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};
  height: ${(props) => (props.$itemWidth ? `${props.$itemWidth}px` : "100%")};

  object-fit: contain;
  image-rendering: pixelated;
  aspect-ratio: 1;
`;

const Count = styled.div`
  position: absolute;
  top: 0.2em;
  right: 0.2em;

  background-color: #00000099;
`;

const CountLabel = styled.div`
  padding: 0.5em;
  color: #ccc;
`;
