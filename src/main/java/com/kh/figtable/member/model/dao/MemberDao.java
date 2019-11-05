package com.kh.figtable.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;

@Repository
public interface MemberDao {

	int register(SqlSession session, Member mem);

	Member login(SqlSession session, Member mem);
	
	int likesRes(SqlSession session, Map<String, String> data);
	
	int unlikesRes(SqlSession session, Map<String, String> data);
	
	List<String> getLikes(SqlSession session, String memNo);

}
