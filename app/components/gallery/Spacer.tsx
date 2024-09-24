import React from 'react';
import styled from 'styled-components';

interface SpacerProps {
  height: number;
}

const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <StyledSpacer height={height} />;
};

const StyledSpacer = styled.div<SpacerProps>`
  height: ${(props) => props.height}px;
`;

export default Spacer;

