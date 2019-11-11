package com.kh.figtable.eatdeal.model.service;

import java.util.List;

import com.kh.figtable.eatdeal.model.vo.Eatdeal;

public interface EatdealService {

	List<Eatdeal> getEatdeals();
	Eatdeal getByEatNo (String eatNo);
}
