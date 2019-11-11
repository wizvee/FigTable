package com.kh.figtable.owner.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.MainInfo;

@Repository
public interface OwnerDao {

	MainInfo getOwnerMainInfo(SqlSession session, String resNo);
}
