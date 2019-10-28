package com.kh.figtable.restaurant.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public interface RestaurantDao {
	
	List<Restaurant> getRestaurantsByLocal(SqlSession session, String local);
	
	Restaurant getRestaurantById(SqlSession session, String resNo);

}
