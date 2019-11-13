package com.kh.figtable.member.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.member.model.service.MemberService;
import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
public class MemberController {

	@Autowired
	private MemberService service;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;

	@RequestMapping(value = "/api/auth/register", method = RequestMethod.POST)
	public ResponseEntity<Member> register(@RequestBody Member mem, HttpSession session) {
		// 외부에서 접근할 경우를 대비해 validate 방법을 REST API 내에서도 마련해야,
		// 당장은 session 방식으로
		mem.setMemPassword(pwEncoder.encode(mem.getMemPassword()));
		int result = service.register(mem);
		if (result > 0) {
			// 회원가입에 성공했을 경우 member 반환
			Member m = service.login(mem);
			m.setMemPassword(null);
			// session에 login member server side auth
			session.setAttribute("login", m);
			return new ResponseEntity<Member>(m, HttpStatus.OK);
		}
		// 실패 시 409 에러 반환
		return new ResponseEntity<Member>(HttpStatus.CONFLICT);
	}

	@RequestMapping(value = "/api/auth/login", method = RequestMethod.POST)
	public ResponseEntity<Member> login(@RequestBody Member mem, HttpSession session) {
		Member compare = service.login(mem);

		if (pwEncoder.matches(mem.getMemPassword(), compare.getMemPassword())) {
			// 로그인에 성공했을 경우 member 반환
			compare.setMemPassword(null);
			// session에 login member server side auth
			session.setAttribute("login", compare);
			return new ResponseEntity<Member>(compare, HttpStatus.OK);
		}
		// 실패 시 401 에러 반환
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/api/member/likes", method = RequestMethod.GET)
	public ResponseEntity<List<Restaurant>> getLikes(@RequestParam String memNo) {
		List<Restaurant> list = service.getLikes(memNo);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/like", method = RequestMethod.POST)
	public ResponseEntity likesRes(@RequestBody Map<String, String> data) {
		int r = service.likesRes(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/like", method = RequestMethod.PATCH)
	public ResponseEntity unlikesRes(@RequestBody Map<String, String> data) {
		int r = service.unlikesRes(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/loves", method = RequestMethod.GET)
	public ResponseEntity<List<String>> getLoves(@RequestParam String memNo) {
		List<String> list = service.getLoves(memNo);
		return new ResponseEntity<List<String>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/love", method = RequestMethod.POST)
	public ResponseEntity lovesRv(@RequestBody Map<String, String> data) {
		int r = service.lovesRv(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/love", method = RequestMethod.PATCH)
	public ResponseEntity unlovesRv(@RequestBody Map<String, String> data) {
		int r = service.unlovesRv(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/{memNo}", method = RequestMethod.POST)
	public ResponseEntity<Member> checkMember(@PathVariable("memNo") String memNo) {
		Member m = service.check(memNo);
		m.setMemPassword(null);
		return new ResponseEntity<Member>(m, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/profile", method = RequestMethod.POST)
	public ResponseEntity<String> changeProfile(@RequestParam("memNo") String memNo, MultipartHttpServletRequest req) {
		// 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/profiles");
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
			dir.mkdirs();

		String oldname = service.getOldProfile(memNo);

		// multipart request에서 filename가져오기
		MultipartFile f = req.getFile("profile");
		String original = f.getOriginalFilename();
		String ext = original.substring(original.lastIndexOf("."));
		// rename 규칙 설정
		SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
		String rename = "profile_" + sdf.format(System.currentTimeMillis()) + "_" + memNo + ext;
		// rename으로 파일 저장
		try {
			f.transferTo(new File(saveDir + "/" + rename));
		} catch (IOException e) {
			e.printStackTrace();
		}

		Member m = new Member();
		m.setMemNo(memNo);
		m.setMemProfile(rename);
		int r = service.update(m);

		// update profile이 성공하면 예전 프로필 파일 삭제
		if (r > 0) {
			if (!oldname.equals("default.png")) {
				File d = new File(saveDir + "/" + oldname);
				d.delete();
			}
		}

		return new ResponseEntity<String>(rename, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/follow", method = RequestMethod.POST)
	public ResponseEntity followingMember(@RequestBody Map<String, String> data) {
		int r = service.followingMember(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

}
