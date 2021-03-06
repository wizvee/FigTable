package com.kh.figtable.restaurant.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public class RestaurantDaoImpl implements RestaurantDao {

	@Override
	public List<Restaurant> getRestaurantsByLocal(SqlSession session, String local) {
		return session.selectList("restaurant.getByLocal", local);
	}

	@Override
	public List<Restaurant> getRestaurantsByKeyword(SqlSession session, String keyword) {
		return session.selectList("restaurant.getByKeyword", keyword);
	}

	@Override
	public Restaurant getRestaurantById(SqlSession session, String resNo) {
		return session.selectOne("restaurant.getById", resNo);
	}

	@Override
	public int increaseViews(SqlSession session, String resNo) {
		return session.update("restaurant.increaseViews", resNo);
	}

	@Override
	public String isLiked(SqlSession session, Map<String, String> info) {
		return session.selectOne("restaurant.isLiked", info);
	}

	@Override
	public List<Map<String, Object>> getEatdealArr(SqlSession session, String resNo) {
		return session.selectList("restaurant.getEatdealArr", resNo);
	}

}
