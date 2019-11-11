package com.kh.figtable.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.admin.model.service.AdminService;
import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
public class AdminController {

	@Autowired
	private AdminService service;
	
	//restaurant 등록 신청 내역 가져오기
	@RequestMapping(value = "/api/adminRestaurnats", method = RequestMethod.GET)
	private ResponseEntity<List<Restaurant>> getRestaurantsByApply(){
		List<Restaurant> list = service.getRestaurantsByApply();
		System.out.println("res 갯수 : " + list.size());
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/api/adminOwners", method=RequestMethod.GET)
	private ResponseEntity<List<Owner>> getOwnersByApply(){
		List<Owner> list = service.getOwnersByApply();
		System.out.println("own 갯수 : " + list.size());
		return new ResponseEntity<List<Owner>>(list, HttpStatus.OK);
	}
	
}
