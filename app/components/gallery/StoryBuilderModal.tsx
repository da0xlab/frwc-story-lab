import React from 'react';
import styled from 'styled-components';

const StoryBuilderModal = ({ title, message, onConfirm, onCancel, singleButton }: any) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click happened on the overlay (outside the modal content), close the modal
    if (e.target === e.currentTarget) {
      if (onCancel) {
        onCancel(); // Close the modal if onCancel is provided
      } else {
        onConfirm(); // If onCancel is not provided, fall back to onConfirm
      }
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>
            {singleButton ? "OK" : "Confirm"}
          </ConfirmButton>
          {!singleButton && onCancel && (
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StoryBuilderModal;

// Styled Components for the Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: black; /* Black background */
  color: white; /* White text color */
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  border: 2px solid white; /* White border */
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: white; /* White text color for the title */
`;

const ModalMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: white; /* White text color for the message */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

const CancelButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
