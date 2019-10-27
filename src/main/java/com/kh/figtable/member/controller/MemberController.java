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

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Member> register(@RequestBody Member mem) {
		// 외부에서 접근할 경우를 대비해 validate 방법을 REST API 내에서도 마련해야,
		// 하지만 아직 귀찮.
		
		mem.setMemPassword(pwEncoder.encode(mem.getMemPassword()));
		int result = service.register(mem);
		if (result > 0) {
			// 회원가입에 성공했을 경우 member 반환
			Member m = service.login(mem);
			return new ResponseEntity<Member>(m, HttpStatus.OK);
		}
		// 실패 시 409 에러 반환
		return new ResponseEntity<Member>(HttpStatus.CONFLICT);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Member> login(@RequestBody Member mem) {
		Member m = service.login(mem);
		if(m != null) {
			// 로그인에 성공했을 경우 member 반환
			return new ResponseEntity<Member>(m, HttpStatus.OK);
		}
		// 실패 시 401 에러 반환
		return new ResponseEntity<Member>(HttpStatus.UNAUTHORIZED);
	}
	
	@RequestMapping(value ="/check", method = RequestMethod.GET)
	public ResponseEntity<Member> check(@RequestBody Member mem) {
		if(mem == null) {
			return new ResponseEntity<Member>(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<Member>(mem, HttpStatus.OK);
	}
}
