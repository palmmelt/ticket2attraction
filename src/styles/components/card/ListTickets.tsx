import React, { ReactNode } from "react";
import styled from "styled-components";

const ContainerListTickets = styled.div`
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.grey};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border: 2px solid ${(props) => props.theme.colors.main};

    > .-card-label {
      background-color: ${(props) => props.theme.colors.main};
    }
  }
`;

const ListTickets = ({ children }: { children: ReactNode }) => {
  return <ContainerListTickets>{children}</ContainerListTickets>;
};

export default ListTickets;
