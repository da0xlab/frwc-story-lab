import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import styled from "styled-components";

function DisplayModePicker() {
  const { displayMode, setDisplayMode, setSettingsVisible } = useGalleryContext();

  function handleOnChange(displayMode: GalleryDisplayMode) {
    setDisplayMode(displayMode);
    if(displayMode === GalleryDisplayMode.Slideshow) {
      setSettingsVisible(false);
    }
  }

  return (
    <Container>
      <h3>Display:</h3>
      {Object.values(GalleryDisplayMode).map((m) => {
        return (
          <label key={m}>
            <input
              type="radio"
              value={m}
              checked={displayMode === m}
              onChange={() => {
                handleOnChange(m as GalleryDisplayMode);
              }}
            />
            {m}
          </label>
        );
      })}
    </Container>
  );
}

export default DisplayModePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
