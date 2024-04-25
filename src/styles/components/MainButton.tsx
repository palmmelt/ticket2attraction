import React, { ReactNode } from 'react'
import styled from 'styled-components'


const ContainerMainButton = styled.button`
    width: 100px;
    color: ${(props) => props.theme.colors.firstsub};
    padding: 3px 7px;
    border: 0;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.mainactive};
    transition:background-color 0.3s ease;
    &:hover {
        background-color: ${(props) => props.theme.colors.main};
    }
`;


const MainButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return (
      <ContainerMainButton onClick={onClick}>{children}</ContainerMainButton>
    )
  }
  

export default MainButton;