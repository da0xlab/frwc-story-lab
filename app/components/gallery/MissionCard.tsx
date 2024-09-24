import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaInfoCircle, FaPencilAlt } from "react-icons/fa";
import StoryBuilderModal from "./StoryBuilderModal"; // Import the modal component

const MissionCard = ({ mission, isSelected, onSelect, onEdit, onEditDescription }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [localMissionName, setLocalMissionName] = useState(mission.name);
  const [localMissionDescription, setLocalMissionDescription] = useState(mission.description);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    setLocalMissionName(mission.name); // Sync local state with mission prop changes
    setLocalMissionDescription(mission.description); // Sync local description with mission prop changes
  }, [mission]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest(".edit-icon") || e.target.closest(".edit-icon-description"))
    ) {
      // Prevent selecting the card if the edit icon is clicked
      return;
    }

    onSelect(mission); // Always allow selecting the mission, including the custom one
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setLocalMissionName(newName);
    onEdit(newName); // Update the title in the parent component
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setLocalMissionDescription(newDescription);
    onEditDescription(newDescription); // Update the description in the parent component
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsEditingDescription(false);
    onSelect(mission); // Ensure the custom mission is selected after editing
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <CardContainer $isSelected={isSelected} onClick={handleCardClick}>
      {mission.image && <MissionImage src={mission.image} alt={mission.name} />}
      <TitleContainer>
        {isEditing && mission.type === "custom" ? (
          <>
            <Input
              type="text"
              value={localMissionName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoFocus
            />
            <EditIcon className="edit-icon" onClick={handleTitleClick}>
              <FaPencilAlt />
            </EditIcon>
          </>
        ) : (
          <>
            <MissionTitle>{mission.name}</MissionTitle>
            {mission.type === "custom" && (
              <EditIcon className="edit-icon" onClick={handleTitleClick}>
                <FaPencilAlt />
              </EditIcon>
            )}
          </>
        )}
      </TitleContainer>
      <DescriptionContainer>
        {isEditingDescription && mission.type === "custom" ? (
          <>
            <Input
              type="text"
              value={localMissionDescription}
              onChange={handleDescriptionChange}
              onBlur={handleBlur}
              autoFocus
            />
            <EditIcon className="edit-icon-description" onClick={handleDescriptionClick}>
              <FaPencilAlt />
            </EditIcon>
          </>
        ) : (
          <>
            <MissionDescription
            >
              {mission.description}
            </MissionDescription>
            {mission.type === "custom" && (
              <EditIcon className="edit-icon-description" onClick={handleDescriptionClick}>
                <FaPencilAlt />
              </EditIcon>
            )}
          </>
        )}
        {mission.longDescription && (
          <InfoIconContainer
            onClick={openModal} // Open the modal on click
          >
            <FaInfoCircle />
          </InfoIconContainer>
        )}
      </DescriptionContainer>

      {/* Modal for longDescription */}
      {isModalVisible && (
        <StoryBuilderModal
          title={mission.name}
          message={mission.longDescription}
          onConfirm={closeModal} // Close the modal on confirm
          singleButton={true}  // Show only the OK button
        />
      )}
    </CardContainer>
  );
};

export default MissionCard;

// Styled Components

const CardContainer = styled.div<{ $isSelected: boolean }>`
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#2196f3" : "#ccc")};
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: #2196f3;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MissionImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
`;

const MissionTitle = styled.h3`
  margin-top: 10px;
  font-size: 18px;
`;

const MissionDescription = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: #666;
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
`;

const InfoIconContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #2196f3; /* Color of the info icon */
`;

const EditIcon = styled.div`
  margin-left: 8px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #555;
  }
`;
