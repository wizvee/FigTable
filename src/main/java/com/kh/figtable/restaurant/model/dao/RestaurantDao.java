package com.kh.figtable.restaurant.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public interface RestaurantDao {

	List<Restaurant> getRestaurantsByLocal(SqlSession session, String local);

	List<Restaurant> getRestaurantsByKeyword(SqlSession session, String keyword);

	Restaurant getRestaurantById(SqlSession session, String resNo);

	int increaseViews(SqlSession session, String resNo);

	String isLiked(SqlSession session, Map<String, String> info);

}
