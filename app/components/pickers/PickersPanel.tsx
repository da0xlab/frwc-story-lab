import { NftContractForNft } from "alchemy-sdk";
import styled from "styled-components";
import DisplayModePicker from "./DisplayModePicker";
import ItemSizePicker from "./ItemSizePicker";
import WalletsPicker from "./WalletsPicker";
import NFTCollectionPicker from "./NFTCollectionPicker";

function PickersPanel() {
  return (
    <Container>
      <VStack>
        <DisplayModePicker />
        <ItemSizePicker />
      </VStack>
      <NFTCollectionPicker />
      <WalletsPicker />
    </Container>
  );
}

export default PickersPanel;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  background-color: #33333333;
  color: #fff;

  width: 100%;
  padding: 1em;
  gap: 2em;

  flex-wrap: wrap;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  width: 100%;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
`;
