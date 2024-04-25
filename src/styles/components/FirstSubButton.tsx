import React, { ReactNode } from 'react'
import styled from 'styled-components'


const ContainerFirstSubButton = styled.button`
    width: 100px;
    color: ${(props) => props.theme.colors.main};
    padding: 3px 7px;
    border: 1px solid ${(props) => props.theme.colors.main};
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.firstsub};
    transition:background-color 0.3s ease;
    &:hover {
        background: ${(props) => props.theme.colors.main};
        color: ${(props) => props.theme.colors.firstsub};
    }
`;


const FirstSubButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return (
      <ContainerFirstSubButton onClick={onClick}>{children}</ContainerFirstSubButton>
    )
  }
  

export default FirstSubButton;