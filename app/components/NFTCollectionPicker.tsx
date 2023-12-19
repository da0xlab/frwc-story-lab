import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../contexts/GalleryContext";
import styled from "styled-components";

function NFTCollectionPicker({
  ownedCollections,
}: {
  ownedCollections: NftContractForNft[];
}) {
  const { collections, setCollections } = useGalleryContext();

  function handleOnChange(collection: NftContractForNft) {
    if (collections.includes(collection.address)) {
      setCollections(collections.filter((c) => c !== collection.address));
    } else {
      setCollections([...collections, collection.address]);
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
              checked={collections.includes(c.address)}
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
