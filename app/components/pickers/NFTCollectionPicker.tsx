import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../../contexts/GalleryContext";
import styled from "styled-components";

function NFTCollectionPicker() {
  const {
    ownedCollections,
    selectedCollections,
    setSelectedCollections: setSelectedCollections,
  } = useGalleryContext();

  function handleOnChange(collection: NftContractForNft) {
    if (selectedCollections.includes(collection.address)) {
      setSelectedCollections(
        selectedCollections.filter((c) => c !== collection.address)
      );
    } else {
      setSelectedCollections([...selectedCollections, collection.address]);
    }
  }

  return (
    <Container>
      <h3>Collections:</h3>
      {ownedCollections.map((c) => {
        const id = c.openSeaMetadata.collectionName ?? c.name ?? c.address;
        return (
          <label key={c.address}>
            <input
              type="checkbox"
              id={id}
              checked={selectedCollections.includes(c.address)}
              onChange={() => {
                handleOnChange(c);
              }}
            />
            {id}
          </label>
        );
      })}
    </Container>
  );
}

export default NFTCollectionPicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
