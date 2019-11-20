package com.kh.figtable.owner.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.Owner;
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
	
	@Override
	public String getOldThumb(SqlSession session, String resNo) {
		return session.selectOne("owner.getOldThumb", resNo);
	}
	
	@Override
	public int updateOpen(SqlSession session, Restaurant r) {
		return session.update("owner.updateOpen", r);
	}
	@Override
	public int updateRes(SqlSession session, Restaurant restaurant) {
		return session.update("owner.updateRes", restaurant);
	}
	
	@Override
	public List<Restaurant> searchRes(SqlSession session, String keyword) {
		return session.selectList("owner.searchRes", keyword);
	}
	@Override
	public Restaurant selectRes(SqlSession session, String resNo) {
		return session.selectOne("owner.ownRestaurant", resNo);
	}
	
	@Override
	public int insertOwner(SqlSession session, Owner o) {
		return session.insert("owner.insertOwner", o);
	}
	@Override
	public int insertNewRes(SqlSession session, Restaurant r) {
		return session.insert("owner.insertNewRes", r);
	}
	@Override
	public int insertOldRes(SqlSession session, Restaurant r) {
		return session.update("owner.insertOldRes", r);
	}
	@Override
	public int insertOwnerAuth(SqlSession session, Map<String, String> ownerAuth) {
		return session.insert("owner.insertOwnerAuth", ownerAuth);
	}
	@Override
	public Owner login(SqlSession session, Owner o) {
		return session.selectOne("owner.login", o);
	}
	@Override
	public String getResList(SqlSession session, String ownNo) {
		return session.selectOne("owner.getResList", ownNo);
	}
}
