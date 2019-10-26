package com.kh.figtable.member.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;

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

}
