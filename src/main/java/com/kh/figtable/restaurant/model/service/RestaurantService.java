package com.kh.figtable.restaurant.model.service;

import java.util.List;

import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface RestaurantService {
	
	List<Restaurant> getRestaurantsByLocal(String local);

	List<Restaurant> getRestaurantsByList(List<Restaurant> old);
	
	Restaurant getRestaurantById(boolean validate, String resNo);
	
	
	int increaseViews(String resNo);

}
