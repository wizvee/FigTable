package com.kh.figtable.review.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.figtable.member.model.dao.MemberDao;
import com.kh.figtable.review.model.dao.ReviewDao;
import com.kh.figtable.review.model.vo.Comment;
import com.kh.figtable.review.model.vo.Review;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private SqlSessionTemplate session;
	@Autowired
	private ReviewDao dao;
	@Autowired
	private MemberDao mDao;

	@Override
	public List<Review> getReviewsById(String resNo) {
		List<Review> result = dao.getReviewsById(session, resNo);
		for (Review review : result) {
			List<Comment> comments = dao.getCommentsById(session, review.getRvNo());
			review.setComments(comments);
		}
		return result;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public List<Review> isLoved(String memNo, List<Review> result) {
		for (Review review : result) {
			Map<String, String> info = new HashMap<>();
			info.put("memNo", memNo);
			info.put("rvNo", review.getRvNo());
			String isLoved = dao.isLoved(session, info);
			if (isLoved != null)
				review.setLoved(true);
			else
				review.setLoved(false);
		}
		return result;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public int writeReview(Review review) {
		int r = dao.writeReview(session, review);
		// 리뷰 작성 시 300냥 지급
		Map point = new HashMap();
		point.put("memNo", review.getMemNo());
		point.put("poHistory", 300);
		point.put("poContent", "리뷰 작성 300냥 지급");
		mDao.addPoint(session, point);
		return r;
	}

	@Override
	public int writeComment(Comment comment) {
		return dao.wirteComment(session, comment);
	}

	@Override
	public List<Comment> getCommentsById(String rvNo) {
		return dao.getCommentsById(session, rvNo);
	}

	@Override
	public int deleteComment(String rvcNo) {
		return dao.deleteComment(session, rvcNo);
	}

}
