package com.kh.figtable.admin.model.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.admin.model.dao.AdminDao;
import com.kh.figtable.admin.model.vo.Admin;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminQna;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private AdminDao dao;
	
	
	@Override
	public Admin login(Admin admin) {
		return dao.login(session, admin);
	}
	
	//restaurant
	@Override
	public List<Restaurant> getRestaurantsByApply() {
		return dao.getRestaurantsByApply(session);
	}
	
	@Override
	public List<Restaurant> getResList() {
		return dao.getResList(session);
	}
	
	@Override
	public int insertRes(Restaurant res) {
		return dao.insertRes(session, res);
	}
	
	@Override
	public int closeRes(String resNo) {
		return dao.closeRes(session, resNo);
	}
	
	@Override
	public int applyRes(String resNo) {
		return dao.applyRes(session, resNo);
	}
	

	
	//owner
	@Override
	public List<AdminOwner> getOwnersByApply() {
		return dao.getOwnersByApply(session);
	}
	@Override
	public int updateOwnApply(String ownNo) {
		return dao.updateOwnApply(session, ownNo);
	}
	@Override
	public int insertResOwn(AdminOwner owner) {
		return dao.insertResOwn(session, owner);
	}
	
	@Override
	public int returnResOwn(Map data) {
		return dao.returnResOwn(session, data);
	}
	@Override
	public int delLicense(Map data) {
		return dao.delLicense(session, data);
	}
	
	
	
	//review
	@Override
	public List<AdminReview> getReviews() {
		return dao.getReviews(session);
	}

	@Override
	public int returnReview(String rvNo) {
		return dao.returnReview(session, rvNo);
	}
	
	@Override
	public int removeReview(String rvNo) {
		return dao.removeReview(session, rvNo);
	}
	@Override
	public AdminReview getMember(String rvNo) {
		return dao.getMember(session, rvNo);
	}
	@Override
	public int wcIncrease(String memNo) {
		return dao.wcIncrease(session, memNo);
	}
	
	@Override
	public int removeLv(String rvNo) {
		return dao.removeLv(session, rvNo);
	}
	
	
	@Override
	public List<Map> getQnas(String category) {
		return dao.getQnas(session, category);
	}
	
	@Override
	public int qnaCheck(Map data) {
		return dao.qnaCheck(session, data);
	}
	
	@Override
	public int qnaAnswer(Map data) {
		return dao.qnaAnswer(session, data);
	}
	
	@Override
	public int answerCheck(Map data) {
		return dao.answerCheck(session, data);
	}


}
