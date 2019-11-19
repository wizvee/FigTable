package com.kh.figtable.eatdeal.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.eatdeal.model.dao.EatdealDao;
import com.kh.figtable.eatdeal.model.vo.Buyer;
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

	@Override
	public Eatdeal getByEatNo(String eatNo) {
		return dao.getByEatNo(session, eatNo);
	}

	@Override
	public String getMemberPoint(String memNo) {
		return dao.getMemberPoint(session, memNo);
	}

	@Override
	public List<Eatdeal> getByResNo(String resNo) {
		return dao.getByResNo(session, resNo);
	}

	@Override
	public List<Buyer>  getBuy(String resNo) {
		return dao.getBuy(session, resNo);
	}

	@Override
	public int register(Eatdeal eat) {
		return dao.register(session, eat);
	}

	@Override
	public int deleteEat(Map<String, String> data) {
		return dao.deleteEat(session, data);
	}

	@Override
	public int extendEat(Map<String, String> data) {
		return dao.extendEat(session, data);
	}

	@Override
	public int confirmEat(Map<String, String> data) {
		System.out.println("service들어옴");
		return dao.confirmEat(session, data);
	}


}
