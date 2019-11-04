package com.kh.figtable.restaurant.model.service;

import java.util.ArrayList;
import java.util.List;

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
	@Transactional(rollbackFor = Exception.class)
	public List<Restaurant> getRestaurantsByList(List<Restaurant> old) {
		List<Restaurant> list = new ArrayList<>();
		for (Restaurant r : old) {
			list.add(dao.getRestaurantById(session, r.getResNo()));
		}
		return list;
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

}
