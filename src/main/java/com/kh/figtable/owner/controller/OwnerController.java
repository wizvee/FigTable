package com.kh.figtable.owner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.owner.model.service.OwnerService;
import com.kh.figtable.owner.model.vo.MainInfo;




@RestController	
public class OwnerController {

	@Autowired
	private OwnerService service;	
	
	@RequestMapping(value ="/api/owner/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<MainInfo> getOwnerMainInfo(@PathVariable("resNo") String resNo)
	{
		MainInfo info = service.getOwnerMainInfo(resNo);
		return new ResponseEntity<MainInfo>(info, HttpStatus.OK);
	}
}
