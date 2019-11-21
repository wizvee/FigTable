package com.kh.figtable.restaurant.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.naming.spi.DirStateFactory.Result;

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
			if (distance < 6) {
				List<Map<String, Object>> eatdealArr = dao.getEatdealArr(session, res.getResNo());
				res.setEatdealArr(eatdealArr);
				filter.add(res);
			}
		}
		return filter;
	}

	@Override
	public List<Restaurant> getRestaurantsByKeyword(Map<String, Object> data) {
		List<Restaurant> result = dao.getRestaurantsByKeyword(session, (String) data.get("keyword"));
		Double lat = Double.valueOf(String.valueOf(data.get("lat")));
		Double lon = Double.valueOf(String.valueOf(data.get("lon")));

		for (Restaurant res : result) {
			List<Map<String, Object>> eatdealArr = dao.getEatdealArr(session, res.getResNo());
			res.setEatdealArr(eatdealArr);
		}
		for (int i = 0; i < result.size(); i++) {
			for (int j = i + 1; j < result.size(); j++) {
				double dist1 = DistanceHandler.calDistance(lat, lon, result.get(i).getResLat(),
						result.get(i).getResLong());
				double dist2 = DistanceHandler.calDistance(lat, lon, result.get(j).getResLat(),
						result.get(j).getResLong());
				if (dist1 > dist2) {
					Restaurant temp = result.get(i);
					result.set(i, result.get(j));
					result.set(j, temp);
				}
			}
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
