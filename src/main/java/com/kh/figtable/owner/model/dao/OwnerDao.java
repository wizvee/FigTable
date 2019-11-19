package com.kh.figtable.owner.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.Owner;
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
	List<Restaurant> searchRes(SqlSession session, String keyword);
	Restaurant selectRes(SqlSession session, String resNo);
	int insertOwner(SqlSession session, Owner o);
	int insertNewRes(SqlSession session, Restaurant r);
	int insertOldRes(SqlSession session, Restaurant r);
	int insertOwnerAuth(SqlSession session, Map<String,String> ownerAuth);
	
}
