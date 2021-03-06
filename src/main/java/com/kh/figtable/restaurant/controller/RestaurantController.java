package com.kh.figtable.restaurant.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.service.RestaurantService;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
public class RestaurantController {

	@Autowired
	private RestaurantService service;

	@RequestMapping(value = "/api/restaurants", method = RequestMethod.POST)
	private ResponseEntity<List<Restaurant>> getRestaurantsByLocal(@RequestBody Map<String, Object> data) {
		List<Restaurant> list = service.getRestaurantsByLocal(data);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/restaurantsk", method = RequestMethod.POST)
	private ResponseEntity<List<Restaurant>> getRestaurantsByKeyword(@RequestBody Map<String, Object> data) {
		List<Restaurant> list = service.getRestaurantsByKeyword(data);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/restaurants/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<Restaurant> getRestaurantById(@PathVariable("resNo") String resNo, HttpServletRequest req,
			HttpServletResponse res) {
		boolean validate = false;

		// 저장된 쿠키 불러오기
		Cookie[] cookies = req.getCookies();
		Map<String, String> map = new HashMap<>();
		if (req.getCookies() != null) {
			for (Cookie c : cookies)
				map.put(c.getName(), c.getValue());
		}
		// 저장된 쿠키 중에 resViewCnt만 불러오기
		String resViewCnt = map.get("resViewCount");
		// 저장될 새로운 쿠키값 생성
		String newResViewCnt = "|" + resNo;
		// 저장될 쿠키에 새로운 쿠키값이 존재하는 지 검사
		if (StringUtils.indexOfIgnoreCase(resViewCnt, newResViewCnt) == -1) {
			// 없을 경우 validate true, 즉 조회수 증가
			validate = true;
			// 쿠키 생성
			Cookie cookie = new Cookie("resViewCount", resViewCnt + newResViewCnt);
			res.addCookie(cookie);
		}

		Restaurant result = service.getRestaurantById(validate, resNo);
		if (result == null)
			return new ResponseEntity(HttpStatus.NOT_FOUND);

		// 로그인 되어 있다면 likes 여부를 판별
		Member m = (Member) req.getSession().getAttribute("login");
		if (m != null) {
			Map<String, String> info = new HashMap<>();
			info.put("memNo", m.getMemNo());
			info.put("resNo", result.getResNo());
			String isLiked = service.isLiked(info);
			if (isLiked != null)
				result.setLiked(true);
			else
				result.setLiked(false);
		}

		return new ResponseEntity<Restaurant>(result, HttpStatus.OK);
	}

}
