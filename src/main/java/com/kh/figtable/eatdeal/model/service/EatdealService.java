package com.kh.figtable.eatdeal.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

public interface EatdealService {

	List<Eatdeal> getEatdeals();
	Eatdeal getByEatNo (String eatNo);
	String getMemberPoint(String memNo);
	List<Eatdeal>getByResNo(String resNo);
	List<Buyer> getBuy(String resNo);
	int register(Eatdeal eat);
	int deleteEat(Map<String, String> data);
	int extendEat(Map<String, String> data);
	int confirmEat(Map<String, String> data);
	Eatdeal getEatdeal(Map<String, String> data);
	int afterPayEat(Map<String, String> data);
	int setBuyer(Map<String, String> data);
	int setPoint(Map<String, String> data);
}
