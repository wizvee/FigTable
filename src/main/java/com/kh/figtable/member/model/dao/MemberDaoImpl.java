package com.kh.figtable.member.model.dao;

import java.util.List;
import java.util.Map;

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

	@Override
	public int likesRes(SqlSession session, Map<String, String> data) {
		return session.insert("member.likesRes", data);
	}

	@Override
	public int unlikesRes(SqlSession session, Map<String, String> data) {
		return session.delete("member.unlikesRes", data);
	}

	@Override
	public List<String> getLikes(SqlSession session, String memNo) {
		return session.selectList("member.getLikes", memNo);
	}

}
