package com.kh.figtable.admin.model.service;

import java.util.List;

import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;
import com.kh.figtable.review.model.vo.Review;

public interface AdminService {
	//restaurant
	List<Restaurant> getRestaurantsByApply();
	
	
	//owner
	List<Owner> getOwnersByApply();
	
	
	//review
	List<Review> getReviews();
	

}
