import {
  GalleryDisplayMode,
  useGalleryContext,
} from "../../contexts/GalleryContext";
import styled from "styled-components";

function DisplayModePicker() {
  const {
    displayMode,
    setDisplayMode,
    setSettingsVisible,
    showCollectionTitles,
    setShowCollectionTitles,
  } = useGalleryContext();

  function handleOnChange(displayMode: GalleryDisplayMode) {
    setDisplayMode(displayMode);

  }

  function toggleShowCollectionAddresses() {
    setShowCollectionTitles(!showCollectionTitles);
  }

  return (
    <>
      <h3>Display:</h3>
      <Container>
        <DisplayModes>
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
        </DisplayModes>

        {displayMode === GalleryDisplayMode.ByCollection && (
          <label>
            <input
              type="checkbox"
              checked={showCollectionTitles}
              onChange={toggleShowCollectionAddresses}
            />
            Show collection names
          </label>
        )}
      </Container>
    </>
  );
}

export default DisplayModePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 1em;
  z-index: 2;
`;

const DisplayModes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
