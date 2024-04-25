import styled from "styled-components";

const SelectBarContainer = styled.div`
    padding:0 0 0 10px;
    border-radius:7px;
    border:1px solid  ${(props) => props.theme.colors.main};
    #dropdown-basic{
        color:white;
        background:${(props) => props.theme.colors.main};
    }
`

export {SelectBarContainer};