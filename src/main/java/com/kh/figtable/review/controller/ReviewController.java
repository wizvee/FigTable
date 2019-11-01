package com.kh.figtable.review.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.figtable.review.model.service.ReviewService;
import com.kh.figtable.review.model.vo.Review;

@RestController
public class ReviewController {

	@Autowired
	private ReviewService service;

	@RequestMapping(value = "/api/reviews/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<List<Review>> getReviewsById(@PathVariable("resNo") String resNo) {
		List<Review> result = service.getReviewsById(resNo);
		return new ResponseEntity<List<Review>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/files", method = RequestMethod.POST)
	private ResponseEntity<List<String>> uploadFiles(MultipartFile[] files, HttpServletRequest req) {
		// 1. 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/reviews");
		List<String> images = new ArrayList<>();
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
			dir.mkdirs();
		// 다중파일을 서버에 저장
		for (MultipartFile f : files) {
			if (!f.isEmpty()) {
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
				images.add("/figtable/resources" + rename);
			}
		}
		return new ResponseEntity<List<String>>(images, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/files", method = RequestMethod.DELETE)
	private void deleteFiles(@RequestBody Map<String, String[]> images, HttpServletRequest req) {
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/reviews");
		// review 등록 실패 혹은 취소 시 파일 삭제 로직
		for (String s : images.get("rvImages")) {
			File f = new File(saveDir + s.substring(s.lastIndexOf("/")));
			f.delete();
		}
	}

//	@RequestMapping(value = "/api/review", method = RequestMethod.POST)
//	private ResponseEntity writeReview(@RequestBody Review review) {
//
//		return new ResponseEntity(HttpStatus.OK);
//	}
}
