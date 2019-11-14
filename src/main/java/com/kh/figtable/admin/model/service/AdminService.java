package com.kh.figtable.admin.model.service;

import java.util.List;

import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;


public interface AdminService {
	//restaurant
	List<Restaurant> getRestaurantsByApply();
	
	
	//owner
	List<AdminOwner> getOwnersByApply();
	
	
	//review
	List<AdminReview> getReviews();
	

}
