import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { MdSearch } from 'react-icons/md';

const SearchWrap= styled.div`
    margin:1rem;
    input{
        border:none;
        border-bottom: 1.5px solid ${palette.textGray};
        :hover{
            border-bottom: 1.5px solid ${palette.primary};
            transition-duration:0.5s;
        }
        :focus{
            border-bottom: 1.5px solid ${palette.primary};

        }
    }
`;
const Button= styled.button`
    border:none;
    background-color:transparent;
    cursor:pointer;
    font-size:1rem;
    
    :hover{
            color: ${palette.primary};
            transition-duration:0.5s;
        }
    outline-style:none;

`;
const Search =({ onSubmit, input, searchKeyword })=>{

    return(
        <>
        <form>
            <SearchWrap>
                <input type="text" 
                name="searchRes"
                value={searchKeyword}
                ref={input} 
                placeholder="구매자이름" />
                <Button onClick={onSubmit}>

                <MdSearch />
                </Button>
            </SearchWrap>
        </form>
         
        
        </>
    )
}

export default Search;