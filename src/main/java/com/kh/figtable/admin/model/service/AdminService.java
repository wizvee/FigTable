package com.kh.figtable.admin.model.service;

import java.util.List;

import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;


public interface AdminService {
	//restaurant
	//	매장 신청 리스트
	List<Restaurant> getRestaurantsByApply();
	//	등록 완료된 매장리스트(owner정보까지 받아야함)
	List<Restaurant> getResList();
	int insertRes(Restaurant res);
	int closeRes(String resNo);
	
	
	//owner
	List<AdminOwner> getOwnersByApply();
	
	
	//review
	List<AdminReview> getReviews();
	int removeReview(String rvNo);
	
	

}
