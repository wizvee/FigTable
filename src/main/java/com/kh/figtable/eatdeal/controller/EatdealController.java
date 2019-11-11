package com.kh.figtable.eatdeal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.eatdeal.model.service.EatdealService;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;
import com.kh.figtable.owner.model.vo.MainInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

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

		System.out.print("컨트롤러 들어옴");
		Eatdeal e= service.getByEatNo(eatNo);
		System.out.print(e.getEatStartDate());
		
		return new ResponseEntity<Eatdeal>(e, HttpStatus.OK);
		
	}

}
