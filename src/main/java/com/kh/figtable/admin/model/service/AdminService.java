package com.kh.figtable.admin.model.service;

import java.util.List;

import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface AdminService {
	//restaurant
	List<Restaurant> getRestaurantsByApply();
	
	
	//owner
	List<Owner> getOwnersByApply();
	
	

}
