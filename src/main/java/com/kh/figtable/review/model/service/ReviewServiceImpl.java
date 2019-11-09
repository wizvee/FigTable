package com.kh.figtable.review.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Override
	@Transactional(rollbackFor = Exception.class)
	public List<Review> isLoved(String memNo, List<Review> result) {
		for (Review review : result) {
			Map<String, String> info = new HashMap<>();
			info.put("memNo", memNo);
			info.put("rvNo", review.getRvNo());
			String isLoved = dao.isLoved(session, info);
			if(isLoved != null)
				review.setLoved(true);
			else
				review.setLoved(false);
		}
		return result;
	}

	@Override
	public int writeReview(Review review) {
		return dao.writeReview(session, review);
	}

}
