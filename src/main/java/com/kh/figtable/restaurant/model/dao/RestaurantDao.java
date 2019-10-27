package com.kh.figtable.restaurant.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public interface RestaurantDao {
	
	Restaurant getRestaurantById(SqlSession session, String resNo);

}
