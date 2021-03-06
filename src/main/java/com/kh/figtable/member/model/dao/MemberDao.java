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

	int registerKakao(SqlSession session, Member mem);

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

	int unfollowingMember(SqlSession session, Map data);

	List<Member> getFollowingList(SqlSession session, String memNo);

	List<Member> getFollowerList(SqlSession session, String memNo);

	List<Map> getMyPoint(SqlSession session, Map data);

	List<Map> getMyCoupon(SqlSession session, Map data);

	List<Map> getQeustionMsgs(SqlSession session, Map data);

	int writeQuestion(SqlSession session, Map data);

	int deleteWarns(SqlSession session, Map data);

	int setWaiting(SqlSession session, Map data);

	Map getWaiting(SqlSession session, String memNo);

	int unWaiting(SqlSession session, String memNo);

}
