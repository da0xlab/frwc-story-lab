import React, { useState, useEffect, useRef } from "react";
import Spacer from "./Spacer";
import styled from "styled-components";
import StoryItemContainer from "./StoryItemContainer";
import CharacterInteractions from "./RandomPaths";
import StoryDescription from "./StoryDescription"; // Import the new component
import MissionSelector from "./MissionSelector"; // Import the new component
import { Mission } from "./missions";

const getInitialState = (key: string, defaultState: any) => {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : defaultState;
};

function StoryBuilder({ availableCharacters }: any) {
  const initialRolesState = {
    hero: null,
    villain: null,
    helper: null,
    donor: null,
    princess: null,
    dispatcher: null,
    falseHero: null,
  };

  const initialActionsState = {
    action1: null,
    action2: null,
    action3: null,
  };

  const initialPlacesState = {
    place1: null,
    place2: null,
  };

  const initialMagicObjectsState = {
    object1: null,
    object2: null,
    object3: null,
    object4: null,
    object5: null,
    object6: null,
    object7: null,
    object8: null,
    object9: null,
  };


  const [roles, setRoles] = useState<any>(() => getInitialState("roles", initialRolesState));
  const [actions, setActions] = useState<any>(() => getInitialState("actions", initialActionsState));
  const [places, setPlaces] = useState<any>(() => getInitialState("places", initialPlacesState));
  const [magicObjects, setMagicObjects] = useState<any>(() => getInitialState("magicObjects", initialMagicObjectsState));
  const [activeTab, setActiveTab] = useState<string | null>(() => localStorage.getItem("activeTab") || "roles");
  const fixedContainerRef: any = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState<any>(0);

  useEffect(() => {
    if (fixedContainerRef.current) {
      setSpacerHeight(fixedContainerRef.current.offsetHeight);
    }
  }, [activeTab, roles, actions, places, magicObjects]);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("actions", JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem("magicObjects", JSON.stringify(magicObjects));
  }, [magicObjects]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab || ""); // Store empty string if no tab is active
  }, [activeTab]);

  const toggleTab = (tabName: string) => {
    setActiveTab((prevTab) => (prevTab === tabName ? null : tabName));
  };

  const randomizeAllRoles = () => {
    const shuffledCharacters = availableCharacters
      .filter((nft: any) => nft.isCharacter)
      .sort(() => 0.5 - Math.random());
    const newRoles: any = {};
    Object.keys(roles).forEach((role, index) => {
      newRoles[role] = shuffledCharacters[index] || null;
    });
    setRoles(newRoles);
  };

  const randomizeRoles = () => {
    const shuffledCharacters = availableCharacters
      .filter((nft: any) => nft.isCharacter)
      .sort(() => 0.5 - Math.random());

    const newRoles: any = { hero: shuffledCharacters[0] || null };

    const numberOfRolesToFill = Math.floor(Math.random() * (Object.keys(roles).length - 1)) + 1;
    const otherRoles = Object.keys(roles).filter((role) => role !== "hero");
    const shuffledRoles = otherRoles.sort(() => 0.5 - Math.random());

    for (let i = 0; i < numberOfRolesToFill; i++) {
      newRoles[shuffledRoles[i]] = shuffledCharacters[i + 1] || null;
    }

    otherRoles.forEach((role) => {
      if (!newRoles[role]) {
        newRoles[role] = null;
      }
    });

    setRoles(newRoles);
  };

  const randomizeObjects = () => {
    const shuffledObjects = availableCharacters
      .filter((nft: any) => nft.isObject)
      .sort(() => 0.5 - Math.random());
    const newObjects: any = {};
    Object.keys(magicObjects).forEach((object, index) => {
      newObjects[object] = shuffledObjects[index] || null;
    });
    setMagicObjects(newObjects);
  };

  const resetAll = () => {
    setRoles(initialRolesState);
    setActions(initialActionsState);
    setPlaces(initialPlacesState);
    setMagicObjects(initialMagicObjectsState);
    localStorage.removeItem("roles");
    localStorage.removeItem("actions");
    localStorage.removeItem("places");
    localStorage.removeItem("magicObjects");
  };

  const generateStorySummary = () => {
    console.log(JSON.stringify(roles))
    const roleDescriptions = Object.entries(roles)
      .filter(([_, character]) => character !== null)
      .map(
        ([role, character]: any) =>
          `${role.charAt(0).toUpperCase() + role.slice(1)}: ${character.name} - ${character.contract.symbol.toLowerCase().charAt(0).toUpperCase() + character.contract.symbol.toLowerCase().slice(1)} #${character.tokenId}`
      );

    const placeDescriptions = Object.entries(places)
      .filter(([_, place]) => place !== null)
      .map(
        ([placeName, place]: any) =>
          `${placeName.charAt(0).toUpperCase() + placeName.slice(1)}: ${place.name} - url: ${place.url}`
      );

    const actionDescriptions = Object.entries(actions)
      .filter(([_, action]) => action !== null)
      .map(
        ([actionName, action]: any) =>
          `${actionName.charAt(0).toUpperCase()+actionName.slice(1)} - ${action.name}: ${action.description}`
      );

    const objectDescriptions = Object.entries(magicObjects)
      .filter(([_, object]) => object !== null)
      .map(
        ([objectName, object]: any) =>
          `${objectName.charAt(0).toUpperCase() + objectName.slice(1)}: ${object.name} - ID: ${object.tokenId}`
      );

    return [...roleDescriptions, ...placeDescriptions, ...actionDescriptions, ...objectDescriptions].join("\n");
  };

  const resetRoles = () => setRoles(initialRolesState);
  const resetActions = () => setActions(initialActionsState);
  const resetPlaces = () => setPlaces(initialPlacesState);
  const resetObjects = () => setMagicObjects(initialMagicObjectsState);
  const countSelectedCharacters = Object.values(roles).filter((role) => role !== null).length;
  
  const [selectedMission, setSelectedMission] = useState<Mission | null>(() => {
    const savedMission = localStorage.getItem("selectedMission");
    return savedMission ? JSON.parse(savedMission) : null;
  });

  useEffect(() => {
    localStorage.setItem("selectedMission", JSON.stringify(selectedMission));
  }, [selectedMission]);

  return (
    <Container>
      <TabContainer>
        <StyledTab $isActive={activeTab === "roles"} onClick={() => toggleTab("roles")}>
          Roles
        </StyledTab>
        <StyledTab $isActive={activeTab === "actions"} onClick={() => toggleTab("actions")}>
          Actions
        </StyledTab>
        <StyledTab $isActive={activeTab === "places"} onClick={() => toggleTab("places")}>
          Places
        </StyledTab>
        <StyledTab $isActive={activeTab === "objects"} onClick={() => toggleTab("objects")}>
          Relics
        </StyledTab>
        <StyledTab $isActive={activeTab === "missions"} onClick={() => toggleTab("missions")}>
          Missions
        </StyledTab>
        <StyledTab $isActive={activeTab === "description"} onClick={() => toggleTab("description")}>
          Story
        </StyledTab>
      </TabContainer>
      <FixedContainer ref={fixedContainerRef}>
        {activeTab === "roles" && (
          <StoryItemContainer
            title="Roles"
            items={roles}
            setItems={setRoles}
            filterFn={(item: any) => item.isCharacter}
            onRandomize={randomizeRoles}
            onRandomizeAll={randomizeAllRoles}
            onReset={resetRoles}
            description="Drag characters in the role boxes or randomize them (you can also add additional roles)"
          />
        )}
        {activeTab === "actions" && (
          <StoryItemContainer
            title="Actions"
            items={actions}
            setItems={setActions}
            onReset={resetActions}
            description="Add up to 31 temporally sorted narrative functions by Vladimir Propp or write your own ones"
          />
        )}
        {activeTab === "places" && (
          <StoryItemContainer
            title="Places"
            items={places}
            setItems={setPlaces}
            onReset={resetPlaces}
            description="Randomize places from Wizzypedia or write your own ones"
          />
        )}
        {activeTab === "missions" && (
          <MissionSelector
          selectedMission={selectedMission}
          setSelectedMission={setSelectedMission}
        />
        )}
        {activeTab === "objects" && (
          <StoryItemContainer
            title="Relics"
            items={magicObjects}
            setItems={setMagicObjects}
            filterFn={(item: any) => item.isObject}
            onRandomize={randomizeObjects}
            onReset={resetObjects}
            description="Drag Items in the relic boxes or randomize them"
          />
        )}
        {activeTab === "description" && (
          <StoryDescription
            roles={roles}
            actions={actions}
            places={places}
            magicObjects={magicObjects}
            mission={selectedMission}
            onReset={resetAll}
          />
        )}
      </FixedContainer>
      <Spacer height={spacerHeight} />
    </Container>
  );
}

export default StoryBuilder;

// Styled Components
const Container = styled.div`
  width: 100%;
  padding-top: 100px;
`;

const FixedContainer = styled.div`
  position: fixed;
  top: 75px;
  width: 100%;
  padding: 20px;
  background-color: #000;
  box-sizing: border-box;
  z-index: 1;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #333;
  position: fixed;
  top: 45px;
  width: 100%;
  z-index: 1;
`;

const StyledTab = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? "#555" : "#333")};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;