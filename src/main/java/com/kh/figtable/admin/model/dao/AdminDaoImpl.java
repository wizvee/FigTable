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
	
	

}
