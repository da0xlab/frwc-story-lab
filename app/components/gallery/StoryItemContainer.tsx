import React from "react";
import styled from "styled-components";
import StoryItemBox from "./StoryItemBox";
import places from "./places";
import proppFunctions from "./proppsFunctions";

function StoryItemContainer({ title, items, setItems, filterFn, onRandomize, onRandomizeAll, onReset, description }: any) {
  const handleDrop = (e: any, role: any) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("nft");
    if (!itemData) return;
    const item = JSON.parse(itemData);
    if (filterFn && !filterFn(item)) return;
    setItems((prevItems: any) => ({
      ...prevItems,
      [role]: item,
    }));
  };

  const removeFromBox = (role: any) => {
    setItems((prevItems: any) => ({
      ...prevItems,
      [role]: null,
    }));
  };

  const removeBox = (role: any) => {
    setItems((prevItems: any) => {
      const newItems = { ...prevItems };
      delete newItems[role];
      return newItems;
    });
  };

  const addItem = () => {
    const newKey = `${title.toLowerCase()}${Object.keys(items).length + 1}`;
    setItems((prevItems: any) => ({
      ...prevItems,
      [newKey]: null,
    }));
  };

  const randomizeActions = () => {
    const selectedIndices = Array.from({ length: proppFunctions.length }, (_, i) => i)
      .sort(() => 0.5 - Math.random())
      .slice(0, Object.keys(items).length);

    selectedIndices.sort((a, b) => a - b);

    const selectedFunctions = selectedIndices.map(index => proppFunctions[index]);

    const newItems: any = {};
    Object.keys(items).forEach((key, index) => {
      newItems[key] = selectedFunctions[index];
    });

    setItems(newItems);
  };

  const randomizePlaces = () => {
    const placeNames = Object.keys(places);
    const selectedPlaces = placeNames
      .sort(() => 0.5 - Math.random())
      .slice(0, Object.keys(items).length)
      .map(name => ({ name, url: `https://wizzypedia.forgottenrunes.com${places[name as keyof typeof places]}` }));

    const newItems: any = {};
    Object.keys(items).forEach((key, index) => {
      newItems[key] = selectedPlaces[index];
    });

    setItems(newItems);
  };

  const handlePlaceChange = (role: any, newPlace: any) => {
    const newUrl = places[newPlace as keyof typeof places] ? `https://wizzypedia.forgottenrunes.com${places[newPlace as keyof typeof places]}` : '';
    setItems((prevItems: any) => ({
      ...prevItems,
      [role]: { name: newPlace, url: newUrl },
    }));
  };

  const handleActionChange = (role: any, newAction: any) => {
    setItems((prevItems: any) => ({
      ...prevItems,
      [role]: { name: newAction },
    }));
  };

  return (
    <>
      {description && <Description>{description}</Description>} 
      <SectionContainer>
        {Object.keys(items).map((role: any) => (
          <StoryItemBox
            key={role}
            title={role.charAt(0).toUpperCase() + role.slice(1)}
            item={items[role]}
            onDrop={(e: any) => handleDrop(e, role)}
            onRemove={() => removeFromBox(role)}
            onRemoveBox={() => removeBox(role)}
            onActionChange={(newAction: any) => handleActionChange(role, newAction)}
            onPlaceChange={(newPlace: any) => handlePlaceChange(role, newPlace)}
          />
        ))}
      </SectionContainer>
      <ButtonContainer>
        <AddButton onClick={addItem}>+ Add {title}</AddButton>
        {onRandomize && (
          <RandomizeButton onClick={onRandomize}>
            Randomize {title}
          </RandomizeButton>
        ) ||
        title.toLowerCase() === "actions" && (
          <RandomizeButton onClick={randomizeActions}>
            Randomize Actions
          </RandomizeButton>
        ) ||
        title.toLowerCase() === "places" && (
          <RandomizeButton onClick={randomizePlaces}>
            Randomize Places
          </RandomizeButton>
        )}
        {onRandomizeAll && (
          <RandomizeButton onClick={onRandomizeAll}>
            Randomize All {title}
          </RandomizeButton>
        )}
        {onReset && (
          <ResetButton onClick={onReset}>
            Reset {title}
          </ResetButton>
        )}
      </ButtonContainer>
    </>
  );
}

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AddButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #1e88e5;
  }
`;

const RandomizeButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e68900;
  }
`;

const ResetButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export default StoryItemContainer;
