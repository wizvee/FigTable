package com.kh.figtable.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.member.model.service.MemberService;
import com.kh.figtable.member.model.vo.Member;

@RestController
@RequestMapping("/api/auth/*")
public class MemberController {

	@Autowired
	private MemberService service;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Member> login(@RequestBody Member mem) {
		Member result = service.login(mem);
		

		return new ResponseEntity<Member>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Member> register(@RequestBody Member mem) {
		mem.setMemPassword(pwEncoder.encode(mem.getMemPassword()));
		int result = service.register(mem);
		

		return new ResponseEntity<Member>(mem, HttpStatus.OK);
	}

}
