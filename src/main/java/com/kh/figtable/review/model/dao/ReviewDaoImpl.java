package com.kh.figtable.review.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.review.model.vo.Review;

@Repository
public class ReviewDaoImpl implements ReviewDao {

	@Override
	public List<Review> getReviewsById(SqlSession session, String resNo) {
		return session.selectList("review.getReviewsById", resNo);
	}

	@Override
	public int writeReview(SqlSession session, Review review) {
		return session.insert("review.writeReview", review);
	}

	
}
