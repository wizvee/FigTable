package com.kh.figtable.owner.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.owner.model.vo.MainInfo;

@Repository
public class OwnerDaoImpl implements OwnerDao {

	@Override
	public MainInfo getOwnerMainInfo(SqlSession session, String resNo) {
		return session.selectOne("owner.mainInfo", resNo);
	}
}
