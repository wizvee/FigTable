package com.kh.figtable.owner.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.owner.model.dao.OwnerDao;
import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class OwnerServiceImple implements OwnerService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private OwnerDao dao;
	
	@Override
	public Restaurant getOwnerRes(String resNo) {

		return dao.getOwnerRes(session, resNo);
	}
	
	@Override
	public OwnerInfo getOwnerHeader(String ownNo) {
		return dao.getOwnerHeader(session, ownNo);
	}
	
	@Override
	public int updateThumb(Map<String, String> data) {
		return dao.updateThumb(session, data);
	}
	
	@Override
	public String getOldThumb(String resNo) {
		return dao.getOldThumb(session, resNo);
	}
	@Override
	public int updateOpen(Restaurant r) {
		return dao.updateOpen(session, r);
	}
	@Override
	public int updateRes(Restaurant restaurant) {
		return dao.updateRes(session, restaurant);
	}
	
	@Override
	public List<Restaurant> searchRes(String keyword) {
		return dao.searchRes(session, keyword);
	}
	@Override
	public Restaurant selectRes(String resNo) {
		return dao.selectRes(session, resNo);
	}
	@Override
	public int enrollOwn(Owner o, Restaurant r, String authFile) {
		int result = 0;
		result = dao.insertOwner(session, o);
		result = 0;
		
		if(r.getResNo().length()==0) {
			result = dao.insertNewRes(session,r);	
		}else {
			result = dao.insertOldRes(session,r);	
		}
		
		Map<String, String> ownerAuth = new HashMap();
		ownerAuth.put("ownNo", o.getOwnNo());
		System.out.println(r.getResNo());
		ownerAuth.put("resNo", r.getResNo());
		ownerAuth.put("authFile", authFile);
		
		result=0;
		result = dao.insertOwnerAuth(session, ownerAuth);
		
		return result;
	}
	
	
}
