import React, { useRef, useState, useEffect } from "react";
//@ts-ignore
//image
import searchIcon from "../../images/search-icon.svg";

//styles
import { Wrapper, Content } from "./SearchBar.styles";

// Types
type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const intital = useRef(true);

  useEffect(() => {
    if (intital.current) {
      intital.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="search movie"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
