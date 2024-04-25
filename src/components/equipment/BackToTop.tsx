import React from "react";
import { fadeIn } from "src/styles/animation/fade";
import styled from "styled-components";

const BackToTopContainer = styled.div`
  padding: 16px 0;
  z-index: 99;
  color: white;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  position:fixed;
  animation:${fadeIn} 1s ease;
  svg{
    color: ${(props) => props.theme.colors.main};
  }
`;


const BackToTop = ({handleScroll}:{handleScroll:boolean}) => {

    const gotoTop =()=> {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }
  return (
    <BackToTopContainer onClick={()=>{gotoTop()}} style={{display:`${handleScroll ? "flex":"none"}`}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        fill="currentColor"
        className="bi bi-arrow-up-circle-fill "
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
      </svg>
    </BackToTopContainer>
  );
};

export default BackToTop;
