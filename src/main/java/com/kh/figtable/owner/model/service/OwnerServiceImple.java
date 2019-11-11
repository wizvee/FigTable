package com.kh.figtable.owner.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.owner.model.dao.OwnerDao;
import com.kh.figtable.owner.model.vo.MainInfo;

@Service
public class OwnerServiceImple implements OwnerService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private OwnerDao dao;
	
	@Override
	public MainInfo getOwnerMainInfo(String resNo) {

		return dao.getOwnerMainInfo(session, resNo);
	}
}
