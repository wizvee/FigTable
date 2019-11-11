import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EatdealCard =styled.div`
    display: flex;
    /* align-items: center;
    justify-content: center; */
    text-align:center; 
    margin:0px auto;
    flex-direction: column;
    width: 50rem;
    height: 30rem;
    
    `;
    
const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    height:75%;
`;
const Image = styled.div`
    background: url(${props => `${props.url}`});
    background-size: cover;
    background-position: center center;
    height: 100%;
    transition: all 0.2s linear;
`;

const LeftArea =styled.div`
    position:absolute;
    left:0;
    bottom:0;
    z-index:2;
    margin-bottom:15px;
    
`;

const RightArea =styled.div`
    position:absolute;
    right:0;
    bottom:0;
    z-index:2;
    margin-bottom:15px;
    text-align: right;

`;

const OriginFoodPrice=styled.div`
    color: white;
    font-size: 1.0rem;
    margin-bottom:0.5rem;
    text-decoration:line-through;
    margin-right:20px;
`;
const FoodPrice=styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight:bold;
    margin-bottom:0.5rem;
    margin-right:20px;
`;

const Status = styled.div`
    align-items: center;
    justify-content: center;
    top: 32px;
    left: 0;
    padding: 0.2rem;
    padding-left:0.7rem;
    padding-right:0.4rem;
    border-bottom-right-radius: 3px;
    background: #212529;
    color: white;
    font-size: 1.0rem;
    background-color:${props => props.color||'#14CBB2'};
    margin-bottom:0.5rem;
    border-top-right-radius:4px;
    border-bottom-right-radius:4px;
`;

const TextContainer =styled.div`
    padding:15px 15px 33px;
    box-sizing: border-box;
    background-color:#FFFFFF;
`;

const RestauName=styled.div`
    text-align:left;
    display:flex;
`;

const RestauNameTitle=styled.span`
    font-size: 1.0rem;
    margin-bottom:0.5rem;
    font-weight:bold;
`;
const DiscountFoodName=styled.div`
    text-align:left;
    font-size: 1.0rem;
    margin-bottom:0.5rem;
`;

const RemainFood=styled.span`
    font-size: 0.8em;
    text-align:right;
    color:red;
    font-weight:bold;
    line-height:1.5;
    margin-left:auto;
`;
const EatdealMainContainer = ({eatdeal}) => {
    
  const {
    eatNo,
    resNo,
    resName,
    resRocationKeyword,
    thumb,
    eatFoodName,
    eatStatus,
    eatCount,
    eatOriginPrice,
    eatDiscount,
    eatStartDate,
    eatEndDate,
    eatContent
  } = eatdeal;

  
    return (
      <Link to={`/figtable/eatdeal/${eatNo}`}>
        <EatdealCard>
            <ImageContainer>
            <Image url={thumb}/>
                <LeftArea>
                    {eatStatus==='P'?
                        (<Status color="#f67280">New</Status>)
                        :(<Status color="#f1c40f">Sold Out</Status>)
                    }
                    <Status >{Number(eatDiscount)*100}%</Status>
                </LeftArea>
                <RightArea>
                    <OriginFoodPrice >\{eatOriginPrice} </OriginFoodPrice>
                    <FoodPrice> \{Number(eatOriginPrice)*(1-Number(eatDiscount))} </FoodPrice>

                </RightArea>
            </ImageContainer>
            <TextContainer>
                <RestauName>
                    <RestauNameTitle>
                    [ {resRocationKeyword}]  {resName}
                    </RestauNameTitle> 
                    {eatCount<=3&& //3개 이하면 표시해줌
                    <RemainFood>
                        {eatCount}개 남음
                    </RemainFood>
                    }
                    </RestauName>
                <DiscountFoodName>{eatFoodName}</DiscountFoodName>
            </TextContainer>

        </EatdealCard>
      </Link>
    );
  };
  
  export default EatdealMainContainer;