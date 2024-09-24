import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronRight, FaChevronDown, FaPencilAlt } from 'react-icons/fa';
import StoryBuilderModal from './StoryBuilderModal'; // Adjust the import path

const StoryDescription = ({ roles, actions, places, magicObjects, mission, onReset }: any) => {
  const [showStoryBuilderModal, setShowStoryBuilderModal] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');


  const handleConfirmReset = () => {
    setShowStoryBuilderModal(false);
    resetActBoxes();
    if (onReset) {
      onReset(); // Call any additional reset logic passed from the parent component
    }
  };

  const handleCancelReset = () => {
    setShowStoryBuilderModal(false);
  };
  const [boxes, setBoxes] = useState(() => {
    const savedBoxes = localStorage.getItem('storyDescriptionBoxes');
    return savedBoxes
      ? JSON.parse(savedBoxes)
      : [
          { id: 1, items: [], title: 'Act 1' },
          { id: 2, items: [], title: 'Act 2' },
          { id: 3, items: [], title: 'Act 3' },
        ];
  });

  const [collapsedBoxes, setCollapsedBoxes] = useState<{ [key: number]: boolean }>({});
  const [editingBoxId, setEditingBoxId] = useState<number | null>(null); // Track which title is being edited

  useEffect(() => {
    localStorage.setItem('storyDescriptionBoxes', JSON.stringify(boxes));
  }, [boxes]);

  const toggleCollapse = (boxId: number) => {
    setCollapsedBoxes((prevState) => ({
      ...prevState,
      [boxId]: !prevState[boxId],
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, boxId: number) => {
    const newTitle = e.target.value;
    setBoxes((prevBoxes: any) =>
      prevBoxes.map((box: any) => (box.id === boxId ? { ...box, title: newTitle } : box))
    );
  };

  const handleTitleClick = (boxId: number) => {
    setEditingBoxId(boxId);
  };

  const handleTitleBlur = () => {
    setEditingBoxId(null);
  };

  const sortItems = (items: any) => {
    const roleItems = items.filter((item: any) =>
      item.role.startsWith('role') ||
      ['hero', 'villain', 'helper', 'donor', 'princess', 'dispatcher', 'falseHero'].includes(
        item.role
      )
    );
    const actionItems = items.filter((item: any) => item.role.startsWith('action'));
    const placeItems = items.filter((item: any) => item.role.startsWith('place'));
    const objectItems = items.filter((item: any) => item.role.startsWith('object'));

    return [...roleItems, ...actionItems, ...placeItems, ...objectItems];
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, boxId: number) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('nft'));
    setBoxes((prevBoxes: any) =>
      prevBoxes.map((box: any) => {
        if (box.id === boxId) {
          const updatedItems = [...box.items, item];
          const sortedItems = sortItems(updatedItems);
          return { ...box, items: sortedItems };
        }
        return box;
      })
    );
  };

  const handleRemoveItem = (boxId: number, itemIndex: number) => {
    setBoxes((prevBoxes: any) =>
      prevBoxes.map((box: any) =>
        box.id === boxId ? { ...box, items: box.items.filter((_: any, index: any) => index !== itemIndex) } : box
      )
    );
  };

  const addBox = () => {
    setBoxes([...boxes, { id: boxes.length + 1, items: [], title: `Act ${boxes.length + 1}` }]);
  };

  const removeBox = (id: number) => {
    setBoxes(boxes.filter((box: any) => box.id !== id));
  };

  const resetActBoxes = () => {
    setBoxes([
      { id: 1, items: [], title: 'Act 1' },
      { id: 2, items: [], title: 'Act 2' },
      { id: 3, items: [], title: 'Act 3' },
    ]);
  };

  const resetAll = () => {
    setShowStoryBuilderModal(true);
  };

  const generateSummary = () => {
    const missionDescription = mission
      ? `Mission: ${mission.name}${mission.description ? " - " + mission.description : ""}\n`
      : "";
  
    const boxSummaries = boxes.map((box: any) => {
      const boxDescription = box.items
        .map((item: any) => {
          let description = "";
  
          switch (item.role) {
            case "hero":
            case "villain":
            case "helper":
            case "donor":
            case "princess":
            case "dispatcher":
            case "falseHero":
              description = `Character: ${
                item.role.charAt(0).toUpperCase() + item.role.slice(1)
              } - ${item.name} - ${item.contract?.symbol} #${item.tokenId}`;
              break;
            default:
              if (item.role.startsWith("role")) {
                description = `Character: ${
                  item.role.charAt(0).toUpperCase() + item.role.slice(1)
                } - ${item.name} - ${item.contract?.symbol} #${item.tokenId}`;
              } else if (item.role.startsWith("action")) {
                description = `Action: ${item.name} - ${item.description}`;
              } else if (item.role.startsWith("place")) {
                description = `Place: ${item.name} - URL: ${item.url}`;
              } else if (item.role.startsWith("object")) {
                description = `Object: ${item.name} - ID: ${item.tokenId}`;
              } else {
                description = `Unknown role: ${item.role}`;
              }
              break;
          }
  
          return description;
        })
        .join("\n");
  
      return `${box.title}:\n${boxDescription}\n`;
    });
  
    return missionDescription + boxSummaries.join("\n");
  };
  

  const copyToClipboard = () => {
    const summary = generateSummary();
    navigator.clipboard.writeText(summary).then(() => {
      setCopyButtonText('Copied!'); // Change button text to "Copied!"
      setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000); // Revert after 2 seconds
    });
  };

  const randomizeActBoxes = () => {
    const selectedItems = [
      ...Object.entries(roles)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(actions)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(places)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(magicObjects)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
    ];
  
    // Separate actions from other items
    const actionItems = selectedItems.filter(item => item.role.startsWith('action'));
    let nonActionItems = selectedItems.filter(item => !item.role.startsWith('action'));
  
    // Sort actions chronologically (assuming 'order' is the property that defines chronology)
    const sortedActions = actionItems.sort((a, b) => (a as any).order - (b as any).order);

    setBoxes((prevBoxes: any) =>
      prevBoxes.map((box: any, index: number) => {
        const hero = nonActionItems.find(item => item.role === 'hero');
        let randomizedItems = [...nonActionItems];
  
        if (hero) {
          // Remove the hero from the list and place it first in the randomized items
          randomizedItems = randomizedItems.filter(item => item.role !== 'hero');
          randomizedItems = [hero, ...shuffleArray(randomizedItems)];
        } else {
          // Shuffle items if no hero is present
          randomizedItems = shuffleArray(randomizedItems);
        }
  
        // Calculate how many actions to include in this box
        const actionsPerBox = Math.floor(sortedActions.length / prevBoxes.length);
        const remainingActions = sortedActions.length % prevBoxes.length;
        const start = index * actionsPerBox + Math.min(index, remainingActions);
        const end = start + actionsPerBox + (index < remainingActions ? 1 : 0);
        const actionsForBox = sortedActions.slice(start, end);
  
        // Assign a random subset of non-action items to the box
        const nonActionItemsForBox = randomizedItems.slice(0, Math.floor(Math.random() * randomizedItems.length + 1));
  
        // Combine actions and non-action items, ensuring actions are in order
        const itemsForBox = [...nonActionItemsForBox, ...actionsForBox];
  
        return { ...box, items: sortItems(itemsForBox) };
      })
    );
  };
  
  

  const renderSelectedImages = () => {
    const selectedItems = [
      ...Object.entries(roles)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(actions)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(places)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
      ...Object.entries(magicObjects)
        .filter(([_, item]) => item !== null)
        .map(([role, item]) => ({ ...(item || {}), role })),
    ];

    return selectedItems.map((item: any, index: number) => (
      <ImageContainer key={index} draggable onDragStart={(e) => e.dataTransfer.setData('nft', JSON.stringify(item))}>
        {item.image && <CardImage src={item.image?.originalUrl} alt={item.name} />}
        <CardName>
          {item.role.charAt(0).toUpperCase() + item.role.slice(1)}: {item.name}
        </CardName>
      </ImageContainer>
    ));
  };

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  return (
    <DescriptionContainer>
      <HeaderContainer>
        <Title>Selected Items</Title>
        <Description>Drag items into the act boxes below</Description>
      </HeaderContainer>

      <ImagesContainer>{renderSelectedImages()}</ImagesContainer>

      <HeaderContainer>
        <Title>Act Boxes</Title>
        <ButtonContainer>
          <AddButton onClick={addBox}>Add Act Box</AddButton>
          <ResetActBoxesButton onClick={resetActBoxes}>
            Reset Act Boxes
          </ResetActBoxesButton>
          <RandomizeButton onClick={randomizeActBoxes}>
            Randomize
          </RandomizeButton>
        </ButtonContainer>
      </HeaderContainer>

      <BoxesContainer>
        {boxes.map((box: any) => (
          <Box key={box.id} onDrop={(e) => handleDrop(e, box.id)} onDragOver={(e) => e.preventDefault()}>
            <BoxHeader>
              {editingBoxId === box.id ? (
                <TitleInput
                  value={box.title}
                  onChange={(e) => handleTitleChange(e, box.id)}
                  onBlur={handleTitleBlur}
                  autoFocus
                />
              ) : (
                <>
                  <BoxTitle onClick={() => handleTitleClick(box.id)}>{box.title}</BoxTitle>
                  <EditIcon onClick={() => handleTitleClick(box.id)}><FaPencilAlt /></EditIcon>
                </>
              )}
              <ChevronIcon onClick={() => toggleCollapse(box.id)}>
                {collapsedBoxes[box.id] ? <FaChevronRight /> : <FaChevronDown />}
              </ChevronIcon>
              <RemoveBoxButton onClick={() => removeBox(box.id)}>-</RemoveBoxButton>
            </BoxHeader>
            {!collapsedBoxes[box.id] && (
              <BoxContent>
                {box.items.map((item: any, index: any) => (
                  <BoxItem key={index}>
                    {item.image && <CardImage src={item.image?.originalUrl} alt={item.name} />}
                    <CardName>
                      {item.role.charAt(0).toUpperCase() + item.role.slice(1)}: {item.name}
                    </CardName>
                    <RemoveItemButton onClick={() => handleRemoveItem(box.id, index)}>-</RemoveItemButton>
                  </BoxItem>
                ))}
              </BoxContent>
            )}
          </Box>
        ))}
      </BoxesContainer>

      <HeaderContainer>
        <Title>Story Summary</Title>
      <ButtonContainer>
        <CopyButton onClick={copyToClipboard}>
        {copyButtonText}
        </CopyButton>
        <ResetButton onClick={resetAll}>
          Reset All
        </ResetButton>
      </ButtonContainer>
      {showStoryBuilderModal && (
        <StoryBuilderModal
          title="Confirm Reset All"
          message="Are you sure you want to reset everything? This action cannot be undone."
          onConfirm={handleConfirmReset}
          onCancel={handleCancelReset}
        />
      )}
      </HeaderContainer>

      <DescriptionText>
        <pre>{generateSummary()}</pre>
      </DescriptionText>
    </DescriptionContainer>
  );
};

export default StoryDescription;

// Styled Components
const RandomizeButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #8e44ad;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #71368a;
  }
`;

const DescriptionContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 70vh;
  overflow-y: auto;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;

  & > * {
    margin-right: 10px;
  }
`;

const ChevronIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const BoxTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const TitleInput = styled.input`
  font-size: 16px;
  font-weight: bold;
  border: none;
  background: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

const EditIcon = styled.span`
  font-size: 12px;
  cursor: pointer;
  color: #888;
  padding: 0px;
`;

const BoxContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  justify-content: center;
  gap: 10px;
`;

const BoxItem = styled.div`
  position: relative;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RemoveItemButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const RemoveBoxButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Add spacing between buttons */
  margin-left: auto; /* Align buttons to the right */
`;

const CopyButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #27ae60;
  }
`;

const AddButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const ResetButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #c0392b;
  }
`;

const ResetActBoxesButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #e67e22;
  }
`;

const DescriptionText = styled.div`
  white-space: pre-wrap;
  font-family: monospace;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const CardName = styled.div`
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
`;

const Description = styled.p`
  margin: 0 0 0 15px;
  font-size: 16px;
  color: #666;
`;
