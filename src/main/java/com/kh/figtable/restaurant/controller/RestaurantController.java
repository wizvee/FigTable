package com.kh.figtable.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.restaurant.model.vo.Restaurant;
import com.kh.figtable.restaurant.service.RestaurantService;

@RestController
public class RestaurantController {

	@Autowired
	private RestaurantService service;

	@RequestMapping(value = "/api/restaurants/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<Restaurant> getRestaurantById(@PathVariable("resNo") String resNo) {
		Restaurant result = service.getRestaurantById(resNo);
		System.out.println(resNo);
		return new ResponseEntity<Restaurant>(result, HttpStatus.OK);
	}

}