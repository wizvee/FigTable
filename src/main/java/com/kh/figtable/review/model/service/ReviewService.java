package com.kh.figtable.review.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.review.model.vo.Comment;
import com.kh.figtable.review.model.vo.Review;

public interface ReviewService {

	List<Review> getMyReviews(String memNo);

	List<Review> getReviewsById(String resNo);

	List<Review> isLoved(String memNo, List<Review> result);

	int writeReview(Review review);

	int deleteReview(Map<String, String> data);

	int writeComment(Comment comment);

	List<Comment> getCommentsById(String rvNo);

	int deleteComment(String rvcNo);

	List<Member> getLoversList(String rvNo);

	int warnReview(String rvNo);

}
