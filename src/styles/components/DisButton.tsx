import React, { ReactNode } from "react";
import styled from "styled-components";

const ContainerDisButton = styled.button`
  width: 100px;
  color: ${(props) => props.theme.colors.firstsub};
  padding: 3px 7px;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.subsilvergrey};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.silvergrey};
  }
`;

const DisButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return <ContainerDisButton onClick={onClick}>{children}</ContainerDisButton>;
};

export default DisButton;
