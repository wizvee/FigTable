package com.kh.figtable.eatdeal.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@Repository
public interface EatdealDao {

	List<Eatdeal> getEatdeals( SqlSession session);
	Eatdeal getByEatNo(SqlSession session, String eatNo);
	String getMemberPoint ( SqlSession session, String memNo);
	List<Eatdeal> getByResNo(SqlSession session, String resNo);
	List<Buyer> getBuy(SqlSession session, String resNo);

}
