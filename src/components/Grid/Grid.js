import React from "react";
//styles
import {
    Wrapper, Content
} from './Grid.styles.js'


//dynamic component
const Grid = ({ headers, children }) => {
    //renders a text and an array
    console.log(children)
    return(
    <Wrapper> 
       <h1> { headers}</h1>
            <Content>
                { children }
            </Content>
    </Wrapper>
)}

export default Grid;