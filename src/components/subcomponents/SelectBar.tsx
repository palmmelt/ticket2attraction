import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {SelectBarContainer} from "../../styles/global/SelectBarContainer";

type Option = {
  label: string;
  action: () => void;
};

type Props = {
  options: Option[];
};

const SelectBar = ({ options }: Props) => {
  const [selectedBar, setSelecetedBar] = useState(options[0].label);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const index = parseInt(eventKey);
      if (!isNaN(index) && index >= 0 && index < options.length) {
        options[index].action();
        setSelecetedBar(options[index].label);
      }
    }
  };

  return (
      <SelectBarContainer className="d-flex flex-row justify-content-center align-items-center">
        <span className="d-flex justify-content-center" style={{height:"100%"}}>Sort By&nbsp;:&nbsp;</span>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            {selectedBar}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {options.map((option, index) => (
              <Dropdown.Item eventKey={index.toString()} key={index}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </SelectBarContainer>
  );
};

export default SelectBar;
