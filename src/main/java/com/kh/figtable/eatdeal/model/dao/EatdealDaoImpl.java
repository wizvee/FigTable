package com.kh.figtable.eatdeal.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@Repository
public class EatdealDaoImpl implements EatdealDao {

	@Override
	public List<Eatdeal> getEatdeals( SqlSession session) {
		return session.selectList("eatdeal.getEatdeals");
	}

	@Override
	public Eatdeal getByEatNo(SqlSession session, String eatNo) {
		return session.selectOne("eatdeal.getByEatNo", eatNo);
	}

	@Override
	public String getMemberPoint(SqlSession session, String memNo) {
		return session.selectOne("eatdeal.getMemberPoint", memNo);
	}

	@Override
	public List<Eatdeal> getByResNo(SqlSession session, String resNo) {
		return session.selectList("eatdeal.getByResNo", resNo);
	}

	@Override
	public List<Buyer> getBuy(SqlSession session, String resNo) {
		return session.selectList("eatdeal.getBuy", resNo);
	}

	@Override
	public int register(SqlSession session, Eatdeal eat) {
		return session.insert("eatdeal.register", eat);
	}

	@Override
	public int deleteEat(SqlSession session, Map<String, String> data) {
		return session.update("eatdeal.deleteEat", data);
	}

	@Override
	public int extendEat(SqlSession session, Map<String, String> data) {
		return session.update("eatdeal.extendEat", data);
	}

	@Override
	public int confirmEat(SqlSession session, Map<String, String> data) {
		return session.update("eatdeal.confirmEat", data);
	}
	



}
