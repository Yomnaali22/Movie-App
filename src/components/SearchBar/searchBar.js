import React, { useRef, useState, useEffect }from "react";

//image
import searchIcon from '../../images/search-icon.svg'

//styles
import { Wrapper, Content } from './SearchBar.styles'



//controlled comp by the state
const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('')
    const intital = useRef(true)
    //console.log(state)

    useEffect(() => {
        if(intital.current){
            intital.current= false;
            return; 
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500)

        return () => clearTimeout(timer)

    }, [setSearchTerm, state])
    
    return(
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon'/> 
                <input
                type='text'
                placeholder='search movie'
                onChange={e => setState(e.target.value)}
                value={state}
                />
            </Content>
        </Wrapper>
    )
}

export default SearchBar;