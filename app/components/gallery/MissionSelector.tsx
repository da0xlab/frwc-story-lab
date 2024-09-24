import React, { useState } from "react";
import MissionCard from "./MissionCard";
import styled from "styled-components";
import { Mission, predefinedMissions } from "./missions";

const MissionSelector = ({ selectedMission, setSelectedMission }: any) => {
  const [customMissionName, setCustomMissionName] = useState(
    predefinedMissions.find((mission) => mission.type === "custom")?.name || "Custom Mission"
  );

  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const handleEditCustomMission = (newName: string) => {
    setCustomMissionName(newName);
    setSelectedMission({
      type: "custom",
      name: newName,
    });
  };

  return (
    <Container>
      <Button onClick={() => handleSelectMission(predefinedMissions[Math.floor(Math.random() * predefinedMissions.length)])}>
        Randomize Mission
      </Button>
      <CardsContainer>
        {predefinedMissions.map((mission) => (
          <MissionCard
            key={mission.type === "custom" ? "custom-mission" : mission.name}  // Ensure the key is unique for the custom mission
            mission={mission.type === "custom" ? { ...mission, name: customMissionName } : mission}
            isSelected={selectedMission?.type === mission.type && selectedMission?.name === (mission.type === "custom" ? customMissionName : mission.name)}
            onSelect={handleSelectMission}
            onEdit={mission.type === "custom" ? handleEditCustomMission : undefined}
          />
        ))}
      </CardsContainer>
    </Container>
  );
};

export default MissionSelector;

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  width: 100%;
`;


const Button = styled.button`
  padding: 10px 15px;
  margin-bottom: 15px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e88e5;
  }
`;

