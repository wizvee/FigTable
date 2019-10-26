package com.kh.figtable.member.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.member.model.dao.MemberDao;
import com.kh.figtable.member.model.vo.Member;

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

}
