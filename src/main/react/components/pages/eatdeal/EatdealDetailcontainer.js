import React from 'react';
import {withRouter} from 'react-router-dom';
import HeaderSimple from '../../common/HeaderSimple';

const sample = [
    {
      eatNo: 1,
      thumb:
        'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190623074633_photo1_a8KtahP0JSRT.jpg',
      title: '달콩카페',
      status:'N',//new
      discount:'20%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:3,
      FoodName:'녹차케이크',
    },
    {
      eatNo: 2,
      thumb:
        'https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/52193_1488438243054735.jpg',
      title: '아이엠바리스타',
      status:'Y',//재입고
      discount:'40%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:50,
      FoodName:'녹차케이크',
    },
    {
      eatNo: 3,
      thumb:
        'https://mp-seoul-image-production-s3.mangoplate.com/819837_1509504944362416.jpg',
      title: '나이트티',
      status:'N',
      discount:'20%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:5,
      FoodName:'녹차케이크',
    },
  ];

const EatdealDetailContainer=({match})=>{
    const { eatNo } = match.params;
    {console.log(eatNo)}
    const eatDealOne = sample.filter(s => s.eatNo === eatNo);
    if(!eatDealOne){
        return <div>존재하지 않습니다.</div>
    }
    return(
        <>
        <HeaderSimple />
        <div>상세페이지 </div>
        </>
    )
};
export default withRouter(EatdealDetailContainer);