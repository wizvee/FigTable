package com.kh.figtable.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.figtable.member.model.service.MemberService;
import com.kh.figtable.member.model.vo.Member;

@RestController
public class MemberController {

	@Autowired
	private MemberService service;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;

	@RequestMapping(value = "/api/auth/register", method = RequestMethod.POST)
	public ResponseEntity<Member> register(@RequestBody Member mem) {
		// 외부에서 접근할 경우를 대비해 validate 방법을 REST API 내에서도 마련해야,
		// 하지만 아직 귀찮.

		mem.setMemPassword(pwEncoder.encode(mem.getMemPassword()));
		int result = service.register(mem);
		if (result > 0) {

			// 회원가입에 성공했을 경우 member 반환
			Member m = service.login(mem);
			m.setMemPassword(null);
			return new ResponseEntity<Member>(m, HttpStatus.OK);
		}
		// 실패 시 409 에러 반환
		return new ResponseEntity<Member>(HttpStatus.CONFLICT);
	}

	@RequestMapping(value = "/api/auth/login", method = RequestMethod.POST)
	public ResponseEntity<Member> login(@RequestBody Member mem) {
		Member compare = service.login(mem);

		if (pwEncoder.matches(mem.getMemPassword(), compare.getMemPassword())) {
			// 로그인에 성공했을 경우 member 반환
			compare.setMemPassword(null);
			return new ResponseEntity<Member>(compare, HttpStatus.OK);
		}
		// 실패 시 401 에러 반환
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/api/member/likes", method = RequestMethod.GET)
	public ResponseEntity<List<String>> getLikes(@RequestParam String memNo) {
		List<String> list = service.getLikes(memNo);
		return new ResponseEntity<List<String>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/like", method = RequestMethod.POST)
	public ResponseEntity<List<String>> likesRes(@RequestBody Map<String, String> data) {
		int r = service.likesRes(data);
		if (r > 0) {
			// likes table에 insert성공하면, 해당 멤버의 likes목록을 업데이트하여 반환
			List<String> list = service.getLikes(data.get("memNo"));
			return new ResponseEntity<List<String>>(list, HttpStatus.OK);
		}
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/like", method = RequestMethod.PATCH)
	public ResponseEntity<List<String>> unlikesRes(@RequestBody Map<String, String> data) {
		int r = service.unlikesRes(data);
		if (r > 0) {
			// likes table에 delete성공하면, 해당 멤버의 likes목록을 업데이트하여 반환
			List<String> list = service.getLikes(data.get("memNo"));
			return new ResponseEntity<List<String>>(list, HttpStatus.OK);
		}
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

}
