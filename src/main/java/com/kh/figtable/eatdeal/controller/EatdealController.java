package com.kh.figtable.eatdeal.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.eatdeal.model.service.EatdealService;
import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@RestController
public class EatdealController {

	@Autowired
	private EatdealService service;

	@RequestMapping(value = "/api/eatdeals", method = RequestMethod.GET)
	private ResponseEntity<List<Eatdeal>> getEatdeals() {

		List<Eatdeal> list = service.getEatdeals();

		return new ResponseEntity<List<Eatdeal>>(list, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/api/eatdeals/{eatNo}", method = RequestMethod.GET)
	private ResponseEntity<Eatdeal> getByEatNo(@PathVariable("eatNo") String eatNo ) {

		Eatdeal e= service.getByEatNo(eatNo);
		
		return new ResponseEntity<Eatdeal>(e, HttpStatus.OK);
		
	}
	@RequestMapping(value = "/api/payment/point", method = RequestMethod.GET)
	private ResponseEntity <String> getMemberPoint(@RequestParam String memNo) {

		String mpoint = service.getMemberPoint(memNo);
		
		return new ResponseEntity<String>(mpoint, HttpStatus.OK);
		
	}
	@RequestMapping(value = "/api/owner/eatdeal", method = RequestMethod.GET)
	private ResponseEntity <List<Eatdeal>>getByResNo(@RequestParam String resNo) {

		List<Eatdeal> list = service.getByResNo(resNo);
		
		return new ResponseEntity<List<Eatdeal>>(list, HttpStatus.OK);
		
	}

	@RequestMapping(value = "/api/owner/eatdeal/buy", method = RequestMethod.GET)
	private ResponseEntity <List<Buyer>>getBuy(@RequestParam String resNo) {

		System.out.print("컨트롤러 들어옴");
		List<Buyer> list = service.getBuy(resNo);
		System.out.print(list);
		
		return new ResponseEntity <List<Buyer>>(list, HttpStatus.OK);
		
	}


}
