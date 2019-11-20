package com.kh.figtable.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.kh.figtable.admin.model.vo.Admin;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface AdminDao {
	
	
	Admin login(SqlSession session, Admin admin);
	
	//restaurant
	List<Restaurant> getRestaurantsByApply(SqlSession session);
	List<Restaurant> getResList(SqlSession session);
	int insertRes(SqlSession session, Restaurant res);
	int closeRes(SqlSession session, String resNo);
	int applyRes(SqlSession session, String resNo);
	
	
	//owner
	List<AdminOwner> getOwnersByApply(SqlSession session);
	int updateOwnApply(SqlSession session, String ownNo);
	int insertResOwn(SqlSession session, AdminOwner owner);
	int returnResOwn(SqlSession session, Map data);
	int delLicense(SqlSession session, Map data);
	
	
	
	//review
	List<AdminReview> getReviews(SqlSession session);
	int returnReview(SqlSession session, String rvNo);
	int removeReview(SqlSession session, String rvNo);
	AdminReview getMember(SqlSession session, String rvNo);
	int wcIncrease(SqlSession session, String memNo);
	int removeLv(SqlSession session, String rvNo);

	
	//Qna
	List<Map> getQnas(SqlSession session, String category);
	int qnaCheck(SqlSession session, Map data);
	int qnaAnswer(SqlSession session, Map data);
	int answerCheck(SqlSession session, Map data);
}
