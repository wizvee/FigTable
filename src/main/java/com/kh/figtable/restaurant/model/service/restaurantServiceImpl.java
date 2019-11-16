package com.kh.figtable.restaurant.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.figtable.restaurant.model.dao.RestaurantDao;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class restaurantServiceImpl implements RestaurantService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private RestaurantDao dao;

	@Override
	public List<Restaurant> getRestaurantsByLocal(String local) {
		return dao.getRestaurantsByLocal(session, local);
	}

	@Override
	public List<Restaurant> getRestaurantsByKeyword(String keyword) {
		return dao.getRestaurantsByKeyword(session, keyword);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public Restaurant getRestaurantById(boolean validate, String resNo) {
		if (validate)
			dao.increaseViews(session, resNo);
		Restaurant result = dao.getRestaurantById(session, resNo);
		return result;
	}

	@Override
	public int increaseViews(String resNo) {
		return dao.increaseViews(session, resNo);
	}

	@Override
	public String isLiked(Map<String, String> info) {
		return dao.isLiked(session, info);
	}

}
