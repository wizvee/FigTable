package com.kh.figtable.owner.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface OwnerService {
	Restaurant getOwnerRes(String resNo);
	OwnerInfo getOwnerHeader(String ownNo);
	String getOldThumb(String resNo);
	int updateThumb(Map<String, String> data);
	int updateOpen(Restaurant r);
	int updateRes(Restaurant restaurant);
	List<Restaurant> searchRes(String keyword);
}
