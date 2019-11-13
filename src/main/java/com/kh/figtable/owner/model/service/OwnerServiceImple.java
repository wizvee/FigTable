package com.kh.figtable.owner.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.owner.model.dao.OwnerDao;
import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;

@Service
public class OwnerServiceImple implements OwnerService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private OwnerDao dao;
	
	@Override
	public OwnRestaurant getOwnerRes(String resNo) {

		return dao.getOwnerRes(session, resNo);
	}
	
	@Override
	public OwnerInfo getOwnerHeader(String ownNo) {
		return dao.getOwnerHeader(session, ownNo);
	}
	
	@Override
	public int updateThumb(OwnRestaurant r) throws Exception {
		int result = dao.updateThumb(session, r);
		if(result == 0) throw new Exception();
		return result;
	}
	
	
}
