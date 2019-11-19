package com.kh.figtable.restaurant.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.figtable.common.DistanceHandler;
import com.kh.figtable.restaurant.model.dao.RestaurantDao;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class restaurantServiceImpl implements RestaurantService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private RestaurantDao dao;

	@Override
	public List<Restaurant> getRestaurantsByLocal(Map<String, Object> data) {
		List<Restaurant> result = dao.getRestaurantsByLocal(session, (String) data.get("searchKey"));
		List<Restaurant> filter = new ArrayList<>();
		for (Restaurant res : result) {
			double distance = DistanceHandler.calDistance((Double) data.get("lat"), (Double) data.get("lon"),
					res.getResLat(), res.getResLong());
			if (distance <= 3) {
				List<Map<String, Object>> eatdealArr = dao.getEatdealArr(session, res.getResNo());
				res.setEatdealArr(eatdealArr);
				filter.add(res);
			}
		}
		return filter;
	}

	@Override
	public List<Restaurant> getRestaurantsByKeyword(String keyword) {
		List<Restaurant> result = dao.getRestaurantsByKeyword(session, keyword);
		for (Restaurant res : result) {
			List<Map<String, Object>> eatdealArr = dao.getEatdealArr(session, res.getResNo());
			res.setEatdealArr(eatdealArr);
		}
		return result;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public Restaurant getRestaurantById(boolean validate, String resNo) {
		if (validate)
			dao.increaseViews(session, resNo);
		Restaurant result = dao.getRestaurantById(session, resNo);
		List<Map<String, Object>> eatdealArr = dao.getEatdealArr(session, result.getResNo());
		result.setEatdealArr(eatdealArr);
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
