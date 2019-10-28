package com.kh.figtable.review.model.service;

import java.util.List;

import com.kh.figtable.review.model.vo.Review;

public interface ReviewService {
	
	List<Review> getReviewsById(String resNo);

}
