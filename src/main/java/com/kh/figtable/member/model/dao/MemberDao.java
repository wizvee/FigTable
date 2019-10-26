package com.kh.figtable.member.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;

@Repository
public interface MemberDao {

	int register(SqlSession session, Member mem);

	Member login(SqlSession session, Member mem);

}
