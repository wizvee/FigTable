package com.kh.figtable.owner.model.service;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.owner.model.dao.OwnerDao;
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
	
	
}
