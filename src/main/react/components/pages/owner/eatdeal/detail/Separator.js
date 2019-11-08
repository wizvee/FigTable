import React from 'react'
import styled from 'styled-components';


export const Separators = styled.div`
    position:relative;
    display: block;
    height:1px;
    margin:0.3rem 0.1rem;
    background-color:#E9E9E9;
`;

const Separator =()=>{
    return(
        <>
            <Separators/>
        </>

    )
}

export default Separator;