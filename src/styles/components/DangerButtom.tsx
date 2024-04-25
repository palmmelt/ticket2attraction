import React, { ReactNode } from 'react'
import styled from 'styled-components'


const ContainerDangerButton = styled.button`
    width: 70px;
    color: ${(props) => props.theme.colors.danger};
    padding: 3px 7px;
    border: 1px solid ${(props) => props.theme.colors.danger};
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.firstsub};
    transition:background-color 0.3s ease;
    &:hover {
        background-color: ${(props) => props.theme.colors.firstsub};
        background: ${(props) => props.theme.colors.danger};
        color: ${(props) => props.theme.colors.firstsub};
    }
`;


const DangerButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return (
      <ContainerDangerButton onClick={onClick}>{children}</ContainerDangerButton>
    )
  }
  

export default DangerButton;