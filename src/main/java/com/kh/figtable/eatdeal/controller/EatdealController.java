package com.kh.figtable.eatdeal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.eatdeal.model.service.EatdealService;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@RestController
public class EatdealController {

	@Autowired
	private EatdealService service;

	@RequestMapping(value = "/api/eatdeals", method = RequestMethod.GET)
	private ResponseEntity<List<Eatdeal>> getEatdeals(@RequestParam String local) {
		List<Eatdeal> list = service.getEatdeals();
		return new ResponseEntity<List<Eatdeal>>(list, HttpStatus.OK);
	}
}
