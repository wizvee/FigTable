package com.kh.figtable.owner.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public class OwnerDaoImpl implements OwnerDao {

	@Override
	public Restaurant getOwnerRes(SqlSession session, String resNo) {
		return session.selectOne("owner.ownRestaurant", resNo);
	}
	
	@Override
	public OwnerInfo getOwnerHeader(SqlSession session, String ownNo) {
		return session.selectOne("owner.ownerInfo", ownNo);
	}
	
	@Override
	public int updateThumb(SqlSession session, Map<String, String> data) {
		return session.update("owner.updateThumb", data);
	}
}
