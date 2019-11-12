package com.kh.figtable.owner.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;

@Repository
public class OwnerDaoImpl implements OwnerDao {

	@Override
	public OwnRestaurant getOwnerRes(SqlSession session, String resNo) {
		return session.selectOne("owner.ownRestaurant", resNo);
	}
	
	@Override
	public OwnerInfo getOwnerHeader(SqlSession session, String ownNo) {
		return session.selectOne("owner.ownerInfo", ownNo);
	}
}
