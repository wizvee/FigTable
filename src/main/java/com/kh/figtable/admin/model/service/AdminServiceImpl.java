package com.kh.figtable.admin.model.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.admin.model.dao.AdminDao;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private AdminDao dao;
	
	//restaurant
	@Override
	public List<Restaurant> getRestaurantsByApply() {
		return dao.getRestaurantsByApply(session);
	}
	

	
	//owner
	@Override
	public List<AdminOwner> getOwnersByApply() {
		return dao.getOwnersByApply(session);
	}
	
	
	
	//review
	@Override
	public List<AdminReview> getReviews() {
		return dao.getReviews(session);
	}

}
