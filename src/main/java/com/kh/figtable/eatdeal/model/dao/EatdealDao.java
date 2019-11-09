package com.kh.figtable.eatdeal.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@Repository
public interface EatdealDao {

	List<Eatdeal> getEatdeals(SqlSession session);


}
