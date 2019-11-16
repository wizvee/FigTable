import client, { path } from './client';

//register eatdeal
export const newEat=({ resNo, resName, resRocationKeyword, thumb, eatFoodName, eatCount, eatOriginPrice, eatDiscount, eatStartDate, eatEndDate, eatContent, })=>
    client.post(`${path}/api/newEat/register`,{
	resNo,
	resName,
	resRocationKeyword,
    thumb,
	eatFoodName,
	eatCount,
	eatOriginPrice,
	eatDiscount,
	eatStartDate,
	eatEndDate,
	eatContent,
});
export default newEat;
