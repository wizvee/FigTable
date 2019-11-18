package com.kh.figtable.review.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.review.model.vo.Comment;
import com.kh.figtable.review.model.vo.Review;

@Repository
public class ReviewDaoImpl implements ReviewDao {

	@Override
	public List<Review> getMyReviews(SqlSession session, String memNo) {
		return session.selectList("review.getMyReviews", memNo);
	}

	@Override
	public List<Review> getReviewsById(SqlSession session, String resNo) {
		return session.selectList("review.getReviewsById", resNo);
	}

	@Override
	public List<Comment> getCommentsById(SqlSession session, String rvNo) {
		return session.selectList("comment.getCommentsById", rvNo);
	}

	@Override
	public String isLoved(SqlSession session, Map<String, String> info) {
		return session.selectOne("review.isLoved", info);
	}

	@Override
	public int writeReview(SqlSession session, Review review) {
		return session.insert("review.writeReview", review);
	}

	@Override
	public int deleteReview(SqlSession session, Map<String, String> data) {
		return session.delete("review.deleteReview", data);
	}

	@Override
	public int wirteComment(SqlSession session, Comment comment) {
		return session.insert("comment.wirteComment", comment);
	}

	@Override
	public int deleteComment(SqlSession session, String rvcNo) {
		return session.delete("comment.deleteComment", rvcNo);
	}

	@Override
	public List<Member> getLoversList(SqlSession session, String rvNo) {
		return session.selectList("member.getLoversList", rvNo);
	}

	@Override
	public int warnReview(SqlSession session, String rvNo) {
		return session.update("review.warnReview", rvNo);
	}

	@Override
	public List<Review> getFeed(SqlSession session, List<Member> following) {
		return session.selectList("review.getFeed", following);
	}

	@Override
	public int deleteReviewLovers(SqlSession session, String rvNo) {
		return session.delete("review.deleteReviewLovers", rvNo);
	}

}
