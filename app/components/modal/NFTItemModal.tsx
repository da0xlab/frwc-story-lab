import { useModalContext } from "@/app/contexts/ModalContext";
import { NFTMetaData } from "@/app/hooks/useOwnedNFTs";
import styled from "styled-components";
import NFTItem from "../gallery/NFTItem";

const NFTItemModal = () => {
  const { modalItem, setModalItem } = useModalContext();

  if (!modalItem) {
    return null;
  }

  const meta = modalItem.raw.metadata as NFTMetaData;

  return (
    <Container
      onClick={() => {
        setModalItem(undefined);
      }}
    >
      <Item>
        <VStack>
          <NFTImage src={modalItem?.image.originalUrl} />
          <Title>
            #{modalItem?.tokenId} - {meta.name}
          </Title>
          <Subtitle>{modalItem.collection?.name}</Subtitle>
        </VStack>
        <HStack>
          {meta.attributes.map((attr) => (
            <Trait key={attr.trait_type}>
              <TraitType>{attr.trait_type.toUpperCase()}</TraitType>
              <TraitValue>{attr.value}</TraitValue>
            </Trait>
          ))}
        </HStack>
      </Item>
    </Container>
  );
};

export default NFTItemModal;

const Container = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #000000cc;
  color: #fff;
`;

const Item = styled.div`
  max-width: 90%;
  max-height: 80%;

  padding: 2em;
  background-color: #000;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  overflow-y: auto;

  gap: 1em;

  border-style: solid;
  border-color: #333;
`;

const Title = styled.div`
  font-size: 2em;
`;

const Subtitle = styled.h3`
  font-size: 1em;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  flex-wrap: wrap;
  gap: 1em;
  width: 50%;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  gap: 1em;
  /* width: 50%; */
  height: 100%;
`;

const NFTImage = styled.img`
  object-fit: contain;
  image-rendering: pixelated;
  aspect-ratio: 1;
`;

const Traits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
`;

const Trait = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 1em;
  background-color: #111;

  gap: 0.5em;
`;

const TraitType = styled.div`
  color: #666;
  text-transform: uppercase;
  text-align: center;
  font-size: 1em;
  width: 100%;
`;

const TraitValue = styled.div`
  text-align: center;
  font-size: 1.2em;
  width: 100%;
`;
