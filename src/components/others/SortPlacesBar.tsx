import React from "react";
import { Dropdown } from "react-bootstrap";
import SelectBar from "../subcomponents/SelectBar";
import { placesType } from "../../App";
import { sortBy } from "../../common/sortPlacesList";
import SearchBar from "../subcomponents/SearchBar";

type Props = {
  places: placesType[];
  setPlaces: React.Dispatch<React.SetStateAction<any[]>>;
};

const SortPlacesBar = ({ places, setPlaces }: Props) => {
  const options = [
    { label: "Default", action: () => setPlaces(sortBy("default", places)) },
    {
      label: "A-Z",
      action: () => setPlaces(sortBy("nameAsc", places)),
    },
    {
      label: "Z-A",
      action: () => setPlaces(sortBy("nameDesc", places)),
    },
    {
      label: "Lowest Price",
      action: () => setPlaces(sortBy("priceAsc", places)),
    },
    {
      label: "Highest Price",
      action: () => setPlaces(sortBy("priceDesc", places)),
    },
  ];

  return (
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-end py-3 px-5 pt-5 mt-5 px-md-4 gap-3 gap-md-0 " >
      <SearchBar
        array={places}
        setArray={setPlaces}
        urlRequest="http://localhost:8080/api/place"
      />
      <SelectBar options={options} />
    </div>
  );
};

export default SortPlacesBar;
