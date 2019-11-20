package com.kh.figtable.member.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface MemberService {

	int register(Member mem);

	int registerKakao(Member mem);

	Member login(Member mem);

	int likesRes(Map<String, String> data);

	int unlikesRes(Map<String, String> data);

	List<Restaurant> getLikes(String memNo);

	List<String> getLoves(String memNo);

	int lovesRv(Map<String, String> data);

	int unlovesRv(Map<String, String> data);

	Member check(String memNo);

	int update(Member m);

	String getOldProfile(String memNo);

	int followingMember(Map<String, String> data);

	int unfollowingMember(Map<String, String> data);

	List<Member> getFollowingList(String memNo);

	List<Member> getFollowerList(String memNo);

	List<Map> getMyPoint(Map data);

	List<Map> getMyCoupon(Map data);

	List<Map> getQeustionMsgs(Map data);

	int writeQuestion(Map data);

	int deleteWarns(Map data);

	int setWaiting(Map data);

	Map getWaiting(String memNo);

	int unWaiting(String memNo);

}
