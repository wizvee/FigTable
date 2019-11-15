import client, { path } from './client';

//register eatdeal
export const newEat=({ thumb,eatFoodName, eatCount, eatOriginPrice, eatDiscount, eatStartDate, eatEndDate, eatContent, })=>
    client.post(`${path}/api/newEat/register`,{
    thumb,
	eatFoodName,
	eatCount,
	eatOriginPrice,
	eatDiscount,
	eatStartDate,
	eatEndDate,
	eatContent,
});
