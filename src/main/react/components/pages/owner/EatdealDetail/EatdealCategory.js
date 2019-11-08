import React from 'react';
import styled,{css} from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';



const categories = [
    {
        name:'manage',
        text:'관리'
    },
    
    {
        name:'buy',
        text:'구매자'
    },
    {
        name:'enroll',
        text:'등록'
    },
]


const SubMenu =styled.div`
    display: inline-block;
    font-size:1rem;
    font-weight:0;
    margin: 0 0.5rem;
    padding: 0.2rem 1rem;
    background-color:rgba(206,212,218,0.5);
    color: ${palette.textGray};
    margin-left:1.2rem;
   

`;

const CategoriesBlock= styled.div`

    display:flex;
    padding:0.3rem;
    margin: 0 auto;
    @media screen and (max-width: 768px){
        width:100%;
        overflow-x:auto;
    }
`;
const Category= styled.div`
    font-size:0.8rem;
    cursor:pointer;
    white-space:pre;
    text-decoration:none;
    color:inherit;
    padding-bottom:0.25rem;

    &:hover{
        color:#495057;
    }
    
     ${props =>
        props.active && css`
        font-weight:600;
        color: ${palette.primary};
        &:hover{
            color:${palette.primary};
        }
    `}

    &+&{
        margin-left:1rem;
    }
`;
const EatdealCategory =({category, onSelect})=>{

    return(
        <SubMenu>
            <CategoriesBlock>
                {categories.map(c=>(
                    <Category 
                    key={c.name}
                    active={category===c.name}
                    onClick={()=>{onSelect(c.name)}}
                    > {c.text}</Category>
                ))}
            </CategoriesBlock>
        </SubMenu>
    )
    
}

export default EatdealCategory;