package com.kh.figtable.admin.model.dao;

import java.util.List;

import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;

import org.apache.ibatis.session.SqlSession;

public interface AdminDao {
	
	//restaurant
	List<Restaurant> getRestaurantsByApply(SqlSession session);
	
	
	//owner
	List<Owner> getOwnersByApply(SqlSession session);
	
	

}
