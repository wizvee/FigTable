package com.kh.figtable.admin.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminQna;
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
	int applyRes(String resNo);
	
	
	//owner
	List<AdminOwner> getOwnersByApply();
	int updateOwnApply(String ownNo);
	int insertResOwn(AdminOwner owner);
	int returnResOwn(Map data);
	int delLicense(Map data);
	
	
	//review
	List<AdminReview> getReviews();
	int returnReview(String rvNo);
	AdminReview getMember(String rvNo);
	int wcIncrease(String memNo);
	int removeLv(String rvNo);
	int removeReview(String rvNo);
	
	
	
	//Qna
	List<Map> getQnas(String category);
	int qnaCheck(Map data);
	int qnaAnswer(Map data);
	int answerCheck(Map data);
	
	

}
