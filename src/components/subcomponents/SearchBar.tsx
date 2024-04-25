import { placesType } from "src/App";
import { Method, fetchAPI } from "../../common/fetchAPI";
import { useState } from "react";

type Props = {
  array: placesType[];
  setArray: React.Dispatch<React.SetStateAction<any[]>>;
  urlRequest: string;
};

const SearchBar = ({ array, setArray, urlRequest }: Props) => {

  const [inputSearch, setInputSearch] = useState("");
  const [activeInput,setActiveInput] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitSearch(inputSearch);
    }
  };

  const submitSearch = async (inputSearch: string) => {
    try {
      const res: any = await fetchAPI({
        url: urlRequest,
        method: Method.POST,
        data: { inputSearch },
        headers: {},
      });
      if (res) {
        console.log(res);
        setArray(res.data.data);
        console.log(res);
      } else {
        console.error("Response is undefined");
      }
    } catch (error) {
      console.error(error);
      setArray((prevState) => ({
        ...prevState,
      }));
    }
  };

  return (
    <div
      style={{ width: "auto", height: "32px", overflow: "hidden", border:"1px solid rgb(245, 128, 38)",borderRadius:"5px" }}
    >
      <input
        type="text"
        name="searchbar"
        placeholder="Search Places"
        id=""
        style={{
          width: "auto",
          height: "100%",
          border: "none",
          outline: "none",
          padding: "10px",
        }}
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        onFocus={()=>setActiveInput(true)}
        onMouseLeave={()=>setActiveInput(false)}
      />
      <button
        style={{
          width: "80px",
          height: "100%",
          border: "none",
          backgroundColor:  "rgb(245, 128, 38)",
          color:"white"
        }}
        onClick={() => submitSearch(inputSearch)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
