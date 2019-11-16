package com.kh.figtable.owner.model.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public interface OwnerDao {

	Restaurant getOwnerRes(SqlSession session, String resNo);
	OwnerInfo getOwnerHeader(SqlSession session, String ownNo);
	int updateThumb(SqlSession session, Map<String, String> data);
	String getOldThumb(SqlSession session, String resNo);
	int updateOpen(SqlSession session, Restaurant r);
	int updateRes(SqlSession session, Restaurant restaurant);
}
