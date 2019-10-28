package com.kh.figtable.review.model.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.figtable.review.model.dao.ReviewDao;
import com.kh.figtable.review.model.vo.Review;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private ReviewDao dao;
	
	@Override
	public List<Review> getReviewsById(String resNo) {
		return dao.getReviewsById(session, resNo);
	}

}
