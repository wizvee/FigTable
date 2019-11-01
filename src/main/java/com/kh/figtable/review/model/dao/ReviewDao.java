package com.kh.figtable.review.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.review.model.vo.Review;


@Repository
public interface ReviewDao {

	List<Review> getReviewsById(SqlSession session, String resNo);
	
	int writeReview(SqlSession session, Review review);

}
