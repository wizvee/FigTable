package com.kh.figtable.admin.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface AdminDao {
	
	//restaurant
	List<Restaurant> getRestaurantsByApply(SqlSession session);
	
	
	//owner
	List<Owner> getOwnersByApply(SqlSession session);
	
	
	//review
	List<AdminReview> getReviews(SqlSession session);
	

}
