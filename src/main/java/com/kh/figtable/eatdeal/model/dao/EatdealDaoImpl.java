package com.kh.figtable.eatdeal.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

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
	


}
