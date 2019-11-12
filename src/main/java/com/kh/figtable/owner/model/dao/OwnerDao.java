package com.kh.figtable.owner.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;

@Repository
public interface OwnerDao {

	OwnRestaurant getOwnerRes(SqlSession session, String resNo);
	OwnerInfo getOwnerHeader(SqlSession session, String ownNo);
}
