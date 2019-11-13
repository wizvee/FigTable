package com.kh.figtable.owner.model.service;

import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;

public interface OwnerService {
	OwnRestaurant getOwnerRes(String resNo);
	OwnerInfo getOwnerHeader(String ownNo);
	int updateThumb(OwnRestaurant r) throws Exception;
	
}
