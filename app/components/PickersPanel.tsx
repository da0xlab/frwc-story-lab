import { NftContractForNft } from "alchemy-sdk";
import styled from "styled-components";
import DisplayModePicker from "./DisplayModePicker";
import ItemSizePicker from "./ItemSizePicker";
import WalletsPicker from "./WalletsPicker";
import NFTCollectionPicker from "./NFTCollectionPicker";

function PickersPanel({
  walletAddresses,
  ownedCollections,
}: {
  walletAddresses: string[];
  ownedCollections: NftContractForNft[];
}) {
  return (
    <Container>
      <HStack>
        <DisplayModePicker />
        <ItemSizePicker />
      </HStack>
      <WalletsPicker addresses={walletAddresses} />
      <NFTCollectionPicker ownedCollections={ownedCollections} />
    </Container>
  );
}

export default PickersPanel;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  background-color: #33333333;
  color: #fff;

  /* width: 100%;
  height: 100%; */
  padding: 1em;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  width: 100%;
`;
