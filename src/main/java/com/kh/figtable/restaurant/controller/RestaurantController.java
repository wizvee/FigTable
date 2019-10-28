package com.kh.figtable.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.restaurant.model.service.RestaurantService;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
@RequestMapping(value="/api/restaurants/*")
public class RestaurantController {

	@Autowired
	private RestaurantService service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	private ResponseEntity<List<Restaurant>> getRestaurantsByLocal(@RequestParam String local) {
		List<Restaurant> list = service.getRestaurantsByLocal(local);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<Restaurant> getRestaurantById(@PathVariable("resNo") String resNo) {
		Restaurant result = service.getRestaurantById(resNo);
		return new ResponseEntity<Restaurant>(result, HttpStatus.OK);
	}

}
