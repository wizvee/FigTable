package com.kh.figtable.eatdeal.model.service;

import java.util.HashMap;
import java.util.List;

import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

public interface EatdealService {

	List<Eatdeal> getEatdeals();
	Eatdeal getByEatNo (String eatNo);
	String getMemberPoint(String memNo);
	List<Eatdeal>getByResNo(String resNo);
	List<Buyer> getBuy(String resNo);
	int register(Eatdeal eat);
}
