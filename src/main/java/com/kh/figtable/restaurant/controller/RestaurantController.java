package com.kh.figtable.restaurant.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

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
@RequestMapping(value = "/api/restaurants/*")
public class RestaurantController {

	@Autowired
	private RestaurantService service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	private ResponseEntity<List<Restaurant>> getRestaurantsByLocal(@RequestParam String local) {
		List<Restaurant> list = service.getRestaurantsByLocal(local);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<Restaurant> getRestaurantById(@PathVariable("resNo") String resNo, HttpServletRequest req) {
		Restaurant result = service.getRestaurantById(resNo);
		if (result == null)
			return new ResponseEntity(HttpStatus.NOT_FOUND);

		// 저장된 쿠키 불러오기
		Cookie[] cookies = req.getCookies();
		Map<String, String> map = new HashMap<>();
		if (cookies != null) {
			for (Cookie c : cookies)
				map.put(c.getName(), c.getValue());
		}
		// 저장된 쿠키 중에 viewCount만 불러오기
		String viewCount = map.get("viewCount");
		// 저장될 새로운 쿠키값 생성
		String increase = "|" + resNo;
		// 저장된 쿠키에 새로운 쿠키값이 존재하는 지 검사

		return new ResponseEntity<Restaurant>(result, HttpStatus.OK);
	}

}
