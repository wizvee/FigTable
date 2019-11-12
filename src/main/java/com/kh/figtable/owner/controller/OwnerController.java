package com.kh.figtable.owner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.owner.model.service.OwnerService;
import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;


@RestController	
public class OwnerController {

	@Autowired
	private OwnerService service;	
	
	@RequestMapping(value ="/api/owner/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<OwnRestaurant> getOwnerRes(@PathVariable("resNo") String resNo)
	{
		OwnRestaurant r = service.getOwnerRes(resNo);
		return new ResponseEntity<OwnRestaurant>(r, HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/ownerInfo/{ownNo}", method=RequestMethod.GET)
	private ResponseEntity<OwnerInfo> getOwnerHeader(@PathVariable("ownNo") String ownNo){
		OwnerInfo info = service.getOwnerHeader(ownNo);
		return new ResponseEntity<OwnerInfo>(info, HttpStatus.OK);
	}
	
	
}
