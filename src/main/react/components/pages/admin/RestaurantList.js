import React from 'react';

const RestaurantList = () => {
  const [resList, setresList] = useState([
    {
      resName: '달콩커피',
      resAddr: '경기도 수원시',
      adminName: '김사장',
      id: 1,
    },
    {
      resName: '스타벅스',
      resAddr: '서울시 강남구',
      adminName: '김스타',
      id: 1,
    },
  ]);
  return resList;
};

export default RestaurantList;
