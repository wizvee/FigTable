package com.kh.figtable.admin.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public class AdminDaoImpl implements AdminDao {
	
	//restaurant
	@Override
	public List<Restaurant> getRestaurantsByApply(SqlSession session) {
		return session.selectList("admin.getByResApply");
	}
	
	@Override
	public List<Restaurant> getResList(SqlSession session) {
		return session.selectList("admin.getResList");
	}
	
	@Override
	public int insertRes(SqlSession session, Restaurant res) {
		return session.insert("admin.insertRes", res);
	}
	
	@Override
	public int closeRes(SqlSession session, String resNo) {
		return session.update("admin.closeRes", resNo);
	}
	
	

	
	//owner
	@Override
	public List<AdminOwner> getOwnersByApply(SqlSession session) {
		return session.selectList("admin.getByOwnApply");
	}
	
	
	
	//review
	@Override
	public List<AdminReview> getReviews(SqlSession session) {
		return session.selectList("admin.getReviews");
	}
	
	@Override
	public int removeReview(SqlSession session, String rvNo) {
		return session.delete("admin.removeReview", rvNo);
	}
	

}
