import { useGalleryContext } from "../contexts/GalleryContext";
import styled from "styled-components";

function ItemSizePicker() {
  const { itemSize, setItemSize } = useGalleryContext();

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setItemSize(parseInt(event.target.value));
  }

  return (
    <Container>
      <h3>Image size:</h3>
      <label>
        <input
          type="range"
          min={10}
          max={500}
          value={itemSize}
          onChange={handleOnChange}
        />
        {itemSize} px
      </label>
    </Container>
  );
}

export default ItemSizePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
