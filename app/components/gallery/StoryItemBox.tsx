import React from "react";
import styled from "styled-components";

function StoryItemBox({ title, item, onDrop, onRemove, onRemoveBox, onActionChange, onPlaceChange }: any) {
  const isAction = title.startsWith("Action");
  const isPlace = title.startsWith("Place");
  
  return (
    <BoxContainer onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <RemoveBoxButton onClick={onRemoveBox}>-</RemoveBoxButton>
      <Title>{title}</Title>
      {item && !(isAction || isPlace) ? (
        <ContentBox>
          {item.image && (
            <img
              src={item.image.originalUrl}
              alt={item.name}
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <p>{item.name}</p>
          <RemoveButton onClick={onRemove}>Remove</RemoveButton>
        </ContentBox>
      ) : isAction ? (
        <Input
          type="text"
          value={item ? item.name + ": " + item.description : ""}
          placeholder="Type your action here"
          onChange={(e) => onActionChange(e.target.value)}
        />
      ) : isPlace ? (
        <>
          <Input
            type="text"
            value={item ? item.name : ""}
            placeholder="Type your place here"
            onChange={(e) => onPlaceChange(e.target.value)}
          />
          {item && (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.url ? "wizzypedia" : ""}
            </a>
          )}
        </>
      ) : (
        <p>Drop a token here</p>
      )}
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  position: relative;
  flex: 1 1 200px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  text-align: center;
  box-sizing: border-box;
  min-width: 200px;
  max-width: calc(33.333% - 20px);
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  border: 1px solid #ccc0;
  border-radius: 5px;
  box-sizing: border-box;
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const RemoveBoxButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default StoryItemBox;
