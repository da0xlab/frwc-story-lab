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

  background-color: #000000bb;
  color: #fff;

  backdrop-filter: blur(8px);

  width: 100%;
  padding: 2em;
  gap: 2em;

  flex-wrap: wrap;

  position: fixed;

  z-index: 2;
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
