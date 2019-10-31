package com.kh.figtable.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.review.model.service.ReviewService;
import com.kh.figtable.review.model.vo.Review;

@RestController
@RequestMapping(value="/api/reviews/*")
public class ReviewController {

	@Autowired
	private ReviewService service;

	@RequestMapping(value = "/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<List<Review>> getReviewsById(@PathVariable("resNo") String resNo) {
		List<Review> result = service.getReviewsById(resNo);
		return new ResponseEntity<List<Review>>(result, HttpStatus.OK);
	}

}
