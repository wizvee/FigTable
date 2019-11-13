package com.kh.figtable.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public interface MemberDao {

	int register(SqlSession session, Member mem);

	Member login(SqlSession session, Member mem);

	int likesRes(SqlSession session, Map<String, String> data);

	int unlikesRes(SqlSession session, Map<String, String> data);

	List<Restaurant> getLikes(SqlSession session, String memNo);

	List<String> getLoves(SqlSession session, String memNo);

	int lovesRv(SqlSession session, Map<String, String> data);
	
	int unlovesRv(SqlSession session, Map<String, String> data);

	Member check(SqlSession session, String memNo);

	int update(SqlSession session, Member m);

	String getOldProfile(SqlSession session, String memNo);
	
	int addPoint(SqlSession session, Map point);
	
	int followingMember(SqlSession session, Map data);

}
