package com.kh.figtable.review.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.review.model.vo.Review;


@Repository
public interface ReviewDao {

	List<Review> getReviewsById(SqlSession session, String resNo);
	
	String isLoved(SqlSession session, Map<String, String> info);
	
	int writeReview(SqlSession session, Review review);

}
