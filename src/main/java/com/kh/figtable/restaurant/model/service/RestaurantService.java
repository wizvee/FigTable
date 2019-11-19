package com.kh.figtable.restaurant.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface RestaurantService {

	List<Restaurant> getRestaurantsByLocal(Map<String, Object> data);

	List<Restaurant> getRestaurantsByKeyword(String keyword);

	Restaurant getRestaurantById(boolean validate, String resNo);

	int increaseViews(String resNo);

	String isLiked(Map<String, String> info);

}
