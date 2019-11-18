package com.kh.figtable.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.figtable.member.model.dao.MemberDao;
import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private MemberDao dao;

	@Override
	@Transactional(rollbackFor = Exception.class)
	public int register(Member mem) {
		int r = dao.register(session, mem);
		// 회원가입 성공 시 1,000냥 지급
		Map point = new HashMap();
		point.put("memNo", mem.getMemNo());
		point.put("poHistory", 1000);
		point.put("poContent", "회원 가입");
		dao.addPoint(session, point);
		return r;
	}

	@Override
	public Member login(Member mem) {
		return dao.login(session, mem);
	}

	@Override
	public int likesRes(Map<String, String> data) {
		return dao.likesRes(session, data);
	}

	@Override
	public int unlikesRes(Map<String, String> data) {
		return dao.unlikesRes(session, data);
	}

	@Override
	public List<Restaurant> getLikes(String memNo) {
		return dao.getLikes(session, memNo);
	}

	@Override
	public Member check(String memNo) {
		return dao.check(session, memNo);
	}

	@Override
	public int update(Member m) {
		return dao.update(session, m);
	}

	@Override
	public String getOldProfile(String memNo) {
		return dao.getOldProfile(session, memNo);
	}

	@Override
	public List<String> getLoves(String memNo) {
		return dao.getLoves(session, memNo);
	}

	@Override
	public int lovesRv(Map<String, String> data) {
		return dao.lovesRv(session, data);
	}

	@Override
	public int unlovesRv(Map<String, String> data) {
		return dao.unlovesRv(session, data);
	}

	@Override
	public int followingMember(Map<String, String> data) {
		return dao.followingMember(session, data);
	}

	@Override
	public List<Member> getFollowingList(String memNo) {
		return dao.getFollowingList(session, memNo);
	}

	@Override
	public int unfollowingMember(Map<String, String> data) {
		return dao.unfollowingMember(session, data);
	}

	@Override
	public List<Member> getFollowerList(String memNo) {
		return dao.getFollowerList(session, memNo);
	}

	@Override
	public List<Map> getMyPoint(Map data) {
		return dao.getMyPoint(session, data);
	}

	@Override
	public List<Map> getMyCoupon(Map data) {
		return dao.getMyCoupon(session, data);
	}

	@Override
	public List<Map> getQeustionMsgs(Map data) {
		return dao.getQeustionMsgs(session, data);
	}

	@Override
	public int writeQuestion(Map data) {
		return dao.writeQuestion(session, data);
	}

}
