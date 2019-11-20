package com.kh.figtable.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.admin.model.vo.Admin;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminQna;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public class AdminDaoImpl implements AdminDao {
	
	
	@Override
	public Admin login(SqlSession session, Admin admin) {
		return session.selectOne("admin.login", admin);
	}
	
	//restaurant
	@Override
	public List<Restaurant> getRestaurantsByApply(SqlSession session) {
		return session.selectList("admin.getByResApply");
	}
	
	@Override
	public List<Restaurant> getResList(SqlSession session) {
		return session.selectList("admin.getResList");
	}
	
	@Override
	public int insertRes(SqlSession session, Restaurant res) {
		return session.insert("admin.insertRes", res);
	}
	
	@Override
	public int closeRes(SqlSession session, String resNo) {
		return session.update("admin.closeRes", resNo);
	}
	
	@Override
	public int applyRes(SqlSession session, String resNo) {
		return session.update("admin.applyRes", resNo);
	}
	
	
	

	
	//owner
	@Override
	public List<AdminOwner> getOwnersByApply(SqlSession session) {
		return session.selectList("admin.getByOwnApply");
	}
	
	@Override
	public int updateOwnApply(SqlSession session, String ownNo) {
		return session.update("admin.updateOwnApply", ownNo);
	}
	
	
	
	@Override
	public int insertResOwn(SqlSession session, AdminOwner owner) {
		return session.update("admin.insertResOwn", owner);
	}
	
	@Override
	public int returnResOwn(SqlSession session, Map data) {
		return session.update("admin.returnResOwn", data);
	}
	@Override
	public int delLicense(SqlSession session, Map data) {
		return session.delete("admin.delLicense", data);
	}
	
	
	
	
	
	//review
	@Override
	public List<AdminReview> getReviews(SqlSession session) {
		return session.selectList("admin.getReviews");
	}
	
	@Override
	public int returnReview(SqlSession session, String rvNo) {
		return session.update("admin.returnReview", rvNo);
	}
	
	
	@Override
	public AdminReview getMember(SqlSession session, String rvNo) {
		return session.selectOne("admin.getMember", rvNo);
	}
	@Override
	public int wcIncrease(SqlSession session, String memNo) {
		return session.update("admin.wcIncrease", memNo);
	}
	@Override
	public int removeReview(SqlSession session, String rvNo) {
		return session.delete("admin.removeReview", rvNo);
	}
	
	@Override
	public int removeLv(SqlSession session, String rvNo) {
		return session.delete("admin.removeLv", rvNo);
	}

	
	
	
	//Qna
	@Override
	public List<Map> getQnas(SqlSession session, String category) {
		return session.selectList("admin.getQnas", category);
	}
	
	@Override
	public int qnaCheck(SqlSession session, Map data) {
		return session.update("admin.qnaCheck", data);
	}
	
	@Override
	public int qnaAnswer(SqlSession session, Map data) {
		return session.insert("admin.qnaAnswer", data);
	}
	
	@Override
	public int answerCheck(SqlSession session, Map data) {
		return session.update("admin.answerCheck", data);
	}

}
