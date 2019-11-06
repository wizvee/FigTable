package com.kh.figtable.member.model.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public int register(Member mem) {
		return dao.register(session, mem);
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

}
