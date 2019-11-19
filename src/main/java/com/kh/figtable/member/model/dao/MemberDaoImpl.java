package com.kh.figtable.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Repository
public class MemberDaoImpl implements MemberDao {

	@Override
	public int register(SqlSession session, Member mem) {
		return session.insert("member.register", mem);
	}

	@Override
	public Member login(SqlSession session, Member mem) {
		return session.selectOne("member.login", mem);
	}

	@Override
	public int likesRes(SqlSession session, Map<String, String> data) {
		return session.insert("member.likesRes", data);
	}

	@Override
	public int unlikesRes(SqlSession session, Map<String, String> data) {
		return session.delete("member.unlikesRes", data);
	}

	@Override
	public List<Restaurant> getLikes(SqlSession session, String memNo) {
		return session.selectList("restaurant.getLikes", memNo);
	}

	@Override
	public Member check(SqlSession session, String memNo) {
		return session.selectOne("member.check", memNo);
	}

	@Override
	public int update(SqlSession session, Member m) {
		return session.update("member.update", m);
	}

	@Override
	public String getOldProfile(SqlSession session, String memNo) {
		return session.selectOne("member.getOldProfile", memNo);
	}

	@Override
	public List<String> getLoves(SqlSession session, String memNo) {
		return session.selectList("member.getLoves", memNo);
	}

	@Override
	public int lovesRv(SqlSession session, Map<String, String> data) {
		return session.insert("member.lovesRv", data);
	}

	@Override
	public int unlovesRv(SqlSession session, Map<String, String> data) {
		return session.delete("member.unlovesRv", data);
	}

	@Override
	public int addPoint(SqlSession session, Map point) {
		return session.insert("member.addPoint", point);
	}

	@Override
	public int followingMember(SqlSession session, Map data) {
		return session.insert("member.followingMember", data);
	}

	@Override
	public int unfollowingMember(SqlSession session, Map data) {
		return session.delete("member.unfollowingMember", data);
	}

	@Override
	public List<Member> getFollowingList(SqlSession session, String memNo) {
		return session.selectList("member.getFollowingList", memNo);
	}

	@Override
	public List<Member> getFollowerList(SqlSession session, String memNo) {
		return session.selectList("member.getFollowerList", memNo);
	}

	@Override
	public List<Map> getMyPoint(SqlSession session, Map data) {
		return session.selectList("member.getMyPoint", data);
	}

	@Override
	public List<Map> getMyCoupon(SqlSession session, Map data) {
		return session.selectList("member.getMyCoupon", data);
	}

	@Override
	public List<Map> getQeustionMsgs(SqlSession session, Map data) {
		return session.selectList("member.getQeustionMsgs", data);
	}

	@Override
	public int writeQuestion(SqlSession session, Map data) {
		return session.insert("member.writeQuestion", data);
	}

	@Override
	public int deleteWarns(SqlSession session, Map data) {
		return session.update("member.deleteWarns", data);
	}

	@Override
	public int setWaiting(SqlSession session, Map data) {
		return session.insert("member.setWaiting", data);
	}

	@Override
	public Map getWaiting(SqlSession session, String memNo) {
		return session.selectOne("member.getWaiting", memNo);
	}

	@Override
	public int unWaiting(SqlSession session, String memNo) {
		return session.update("member.unWaiting", memNo);
	}

}
