import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../../contexts/GalleryContext";
import styled from "styled-components";

function NFTCollectionPicker() {
  const { ownedCollections: collections, selectedCollections: selectedCollections, setSelectedCollections: setSelectedCollections } = useGalleryContext();

  function handleOnChange(collection: NftContractForNft) {
    if (selectedCollections.includes(collection.address)) {
      setSelectedCollections(selectedCollections.filter((c) => c !== collection.address));
    } else {
      setSelectedCollections([...selectedCollections, collection.address]);
    }
  }

  return (
    <Container>
      <h3>Collections:</h3>
      {collections.map((c) => {
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
            {/* {c.openSeaMetadata.imageUrl && (
              <img
                src={c.openSeaMetadata.imageUrl}
                width={40}
                height={40}
                alt={id}
              />
            )} */}
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
