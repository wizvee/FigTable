package com.kh.figtable.admin.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface AdminDao {
	
	//restaurant
	List<Restaurant> getRestaurantsByApply(SqlSession session);
	List<Restaurant> getResList(SqlSession session);
	int insertRes(SqlSession session, Restaurant res);
	int closeRes(SqlSession session, String resNo);
	
	
	//owner
	List<AdminOwner> getOwnersByApply(SqlSession session);
	
	
	//review
	List<AdminReview> getReviews(SqlSession session);
	int removeReview(SqlSession session, String rvNo);

}
