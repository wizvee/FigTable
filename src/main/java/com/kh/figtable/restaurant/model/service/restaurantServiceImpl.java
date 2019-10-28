package com.kh.figtable.restaurant.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.restaurant.model.dao.RestaurantDao;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class restaurantServiceImpl implements RestaurantService {
	
	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private RestaurantDao dao;

	@Override
	public Restaurant getRestaurantById(String resNo) {
		return dao.getRestaurantById(session, resNo);
	}

}
