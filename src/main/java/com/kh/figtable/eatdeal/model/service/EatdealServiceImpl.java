package com.kh.figtable.eatdeal.model.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.eatdeal.model.dao.EatdealDao;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@Service
public class EatdealServiceImpl implements EatdealService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private EatdealDao dao;

	@Override
	public List<Eatdeal> getEatdeals() {
		return dao.getEatdeals(session);
	}


}
