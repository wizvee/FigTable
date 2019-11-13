package com.kh.figtable.admin.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;
import com.kh.figtable.review.model.vo.Review;

@Repository
public class AdminDaoImpl implements AdminDao {
	
	//restaurant
	@Override
	public List<Restaurant> getRestaurantsByApply(SqlSession session) {
		return session.selectList("admin.getByResApply");
	}

	
	//owner
	@Override
	public List<Owner> getOwnersByApply(SqlSession session) {
		return session.selectList("admin.getByOwnApply");
	}
	
	
	
	//review
	@Override
	public List<Review> getReviews(SqlSession session) {
		return session.selectList("admin.getReviews");
	}

}
