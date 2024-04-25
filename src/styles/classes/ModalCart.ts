import styled from "styled-components";

const ModalCartContainer = styled.div`
  width: 50vw;
  padding:20px;
  border-radius:5px;
  position: absolute;
  background-color:white;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  @media (max-width: 1200px) {
    width: 100vw;
  }
  .-classes-modal-cart{
    display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  width: 100%;
  overflow-y: scroll;
  }
`;

export { ModalCartContainer };
