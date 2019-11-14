package com.kh.figtable.review.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.member.model.service.MemberService;
import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.review.model.service.ReviewService;
import com.kh.figtable.review.model.vo.Comment;
import com.kh.figtable.review.model.vo.Review;

@RestController
public class ReviewController {

	@Autowired
	private ReviewService service;
	@Autowired
	private MemberService memService;

	@RequestMapping(value = "/api/reviews/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<List<Review>> getReviewsById(@PathVariable("resNo") String resNo, HttpServletRequest req) {
		List<Review> result = service.getReviewsById(resNo);
		// 로그인 되어 있다면 loved 여부를 판별
		Member m = (Member) req.getSession().getAttribute("login");
		if (m != null)
			result = service.isLoved(m.getMemNo(), result);

		return new ResponseEntity<List<Review>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/files", method = RequestMethod.POST)
	private ResponseEntity<List<String>> uploadFiles(MultipartHttpServletRequest req) {
		// 1. 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/reviews");
		List<String> images = new ArrayList<>();
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
			dir.mkdirs();

		// 2. MultipartHttpServletRequest에서 filenames
		Iterator<String> fileNames = req.getFileNames();
		// 다중파일을 서버에 저장
		while (fileNames.hasNext()) {
			String formName = fileNames.next();
			MultipartFile f = req.getFile(formName);
			String original = f.getOriginalFilename();
			String ext = original.substring(original.lastIndexOf("."));
			// rename 규칙 설정
			SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
			String rename = "figtable_" + sdf.format(System.currentTimeMillis()) + ext;
			// rename된 파일명으로 파일 저장
			try {
				f.transferTo(new File(saveDir + "/" + rename));
			} catch (IOException e) {
				e.printStackTrace();
			}
			images.add(rename);
		}

		return new ResponseEntity<List<String>>(images, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/files", method = RequestMethod.PATCH)
	private void deleteFiles(@RequestBody Review review, HttpServletRequest req) {
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/reviews");
//		 review 등록 실패 혹은 취소 시 파일 삭제 로직
		for (String s : review.getRvImages()) {
			File f = new File(saveDir + s.substring(s.lastIndexOf("/")));
			f.delete();
		}
	}

	@RequestMapping(value = "/api/review", method = RequestMethod.POST)
	private ResponseEntity<Integer> writeReview(@RequestBody Review review) {
		int r = service.writeReview(review);

		return new ResponseEntity<Integer>(r, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/comment", method = RequestMethod.POST)
	private ResponseEntity<List<Comment>> writeComment(@RequestBody Comment comment) {
		int r = service.writeComment(comment);
		if (r > 0) {
			List<Comment> comments = service.getCommentsById(comment.getRvNoRef());
			return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
		}
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/comment", method = RequestMethod.PATCH)
	private ResponseEntity<List<Comment>> deleteComment(@RequestBody Map<String, String> data) {
		int r = service.deleteComment(data.get("rvcNo"));
		List<Comment> comments = null;
		if (r > 0) {
			comments = service.getCommentsById(data.get("rvNo"));
			return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
		}
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/review/loves/{rvNo}", method = RequestMethod.GET)
	private ResponseEntity<List<Member>> getLoversList(@PathVariable("rvNo") String rvNo, HttpSession session) {
		List<Member> result = service.getLoversList(rvNo);

		// 로그인 되어 있다면 following 여부를 판별
//		Member m = (Member) session.getAttribute("login");
//		if (m != null) {
//			List<Member> followingList = memService.getFollowingList(m.getMemNo());
//			for (Member member : result) {
//				
//			}
//		}

		return new ResponseEntity<List<Member>>(result, HttpStatus.OK);
	}

}
