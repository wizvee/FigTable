package com.kh.figtable.member.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kh.figtable.member.model.service.MemberService;
import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;
import com.kh.figtable.review.model.service.ReviewService;
import com.kh.figtable.review.model.vo.Review;

@RestController
public class MemberController {

	@Autowired
	private MemberService service;
	@Autowired
	private ReviewService rvService;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;

	public static final String URL = "https://rclass.iptime.org/19PM_figtable_final";

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
			if (service.getWaiting(compare.getMemNo()) != null)
				compare.setWaiting(true);
			else
				compare.setWaiting(false);
			// session에 login member server side auth
			session.setAttribute("login", compare);
			return new ResponseEntity<Member>(compare, HttpStatus.OK);
		}
		// 실패 시 401 에러 반환
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/api/auth/kakao", method = RequestMethod.POST)
	public ResponseEntity<Member> kakaoLogin(@RequestBody String access_Token, HttpSession session) {
		String reqURL = "https://kapi.kakao.com/v2/user/me";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			// 요청에 필요한 Header에 포함될 내용
			conn.setRequestProperty("Authorization", "Bearer " + access_Token);
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}

			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();

			String id = element.getAsJsonObject().get("id").getAsString();
			String nickname = properties.getAsJsonObject().get("nickname").getAsString();
			String profile = properties.getAsJsonObject().get("profile_image").getAsString();

			br.close();

			Member m = service.check(id);
			if (m == null) {
				// 프로필 다운로드
				// 파일저장경로
				String saveDir = session.getServletContext().getRealPath("/resources/upload/profiles");
				// 저장경로가 없으면 생성
				File dir = new File(saveDir);
				if (!dir.exists())
					dir.mkdirs();
				// rename 규칙 설정
				String ext = profile.substring(profile.lastIndexOf(".") + 1);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
				String rename = "profile_" + sdf.format(System.currentTimeMillis()) + "_" + id + "." + ext;
				// rename으로 파일 저장
				URL imgURL = new URL(profile);
				BufferedImage bi = ImageIO.read(imgURL);
				ImageIO.write(bi, ext, new File(saveDir + "/" + rename));

				m = new Member();
				m.setMemNo(id);
				m.setMemName(nickname);
				m.setMemProfile(rename);

				service.registerKakao(m);
				// session에 login member server side auth
				session.setAttribute("login", m);
				return new ResponseEntity<Member>(m, HttpStatus.OK);
			} else {
				if (service.getWaiting(m.getMemNo()) != null)
					m.setWaiting(true);
				else
					m.setWaiting(false);
				// session에 login member server side auth
				session.setAttribute("login", m);
				return new ResponseEntity<Member>(m, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 실패 시 401 에러 반환
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/api/member/{memNo}", method = RequestMethod.POST)
	public ResponseEntity<Member> checkMember(@PathVariable("memNo") String memNo, HttpSession session) {
		Member m = service.check(memNo);
		m.setMemPassword(null);
		if (service.getWaiting(m.getMemNo()) != null)
			m.setWaiting(true);
		else
			m.setWaiting(false);

		if ((Member) session.getAttribute("login") == null)
			session.setAttribute("login", m);
		return new ResponseEntity<Member>(m, HttpStatus.OK);
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

	@RequestMapping(value = "/api/member/profile", method = RequestMethod.PATCH)
	public ResponseEntity editMemberProfile(@RequestBody Member member, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		if (m != null)
			service.update(member);
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/password", method = RequestMethod.PATCH)
	public ResponseEntity editMemberPassword(@RequestBody Map<String, String> data, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		if (m != null) {
			Member compare = service.login(m);
			if (pwEncoder.matches(data.get("oldPassword"), compare.getMemPassword())) {
				Member member = new Member();
				member.setMemNo(m.getMemNo());
				member.setMemPassword(pwEncoder.encode(data.get("memPassword")));
				service.update(member);
			} else
				return new ResponseEntity(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/follwing", method = RequestMethod.GET)
	public ResponseEntity<List<Member>> getFollowingMembers(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Member> result = null;
		if (m != null) {
			result = service.getFollowingList(m.getMemNo());
			for (Member member : result)
				member.setFollowing(true);
		}

		return new ResponseEntity<List<Member>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/follwer", method = RequestMethod.GET)
	public ResponseEntity<List<Member>> getFollowerMembers(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Member> result = null;
		if (m != null) {
			result = service.getFollowerList(m.getMemNo());
			for (Member member : result) {
				List<Member> compare = service.getFollowingList(m.getMemNo());
				if (compare.contains(member))
					member.setFollowing(true);
				else
					member.setFollowing(false);
			}
		}

		return new ResponseEntity<List<Member>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/following", method = RequestMethod.POST)
	public ResponseEntity followingMember(@RequestBody Map<String, String> data) {
		int r = service.followingMember(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/following", method = RequestMethod.PATCH)
	public ResponseEntity unfollowingMember(@RequestBody Map<String, String> data) {
		int r = service.unfollowingMember(data);
		// 성공시 200 반환
		if (r > 0)
			return new ResponseEntity(HttpStatus.OK);
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/member/feed", method = RequestMethod.POST)
	public ResponseEntity<List<Review>> getFeed(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Review> result = null;
		if (m != null) {
			List<Member> following = service.getFollowingList(m.getMemNo());
			if (!following.isEmpty())
				result = rvService.getFeed(following);
		}

		return new ResponseEntity<List<Review>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/reviews", method = RequestMethod.POST)
	private ResponseEntity<List<Review>> getMyReviews(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Review> result = null;
		if (m != null) {
			result = rvService.getMyReviews(m.getMemNo());
			result = rvService.isLoved(m.getMemNo(), result);
		}
		return new ResponseEntity<List<Review>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/point", method = RequestMethod.POST)
	private ResponseEntity<List<Map>> getMyPoint(@RequestBody Map<String, Object> data, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Map> result = null;
		if (m != null) {
			data.put("memNo", m.getMemNo());
			result = service.getMyPoint(data);
		}
		return new ResponseEntity<List<Map>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/coupon", method = RequestMethod.POST)
	private ResponseEntity<List<Map>> getMyCoupon(@RequestBody Map<String, Object> data, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Map> result = null;
		if (m != null) {
			data.put("memNo", m.getMemNo());
			result = service.getMyCoupon(data);
		}
		return new ResponseEntity<List<Map>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/question", method = RequestMethod.GET)
	private ResponseEntity<List<Map>> getMyCoupon(@RequestParam("category") String category, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		List<Map> result = null;
		if (m != null) {
			Map<String, String> data = new HashMap<>();
			data.put("memNo", m.getMemNo());
			data.put("category", category);
			result = service.getQeustionMsgs(data);
		}
		return new ResponseEntity<List<Map>>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/question", method = RequestMethod.POST)
	private ResponseEntity writeQuestion(@RequestBody Map<String, Object> data) {
		// memNo(당사자), targetMemNo(받는 사람), content(내용), category(카테고리) E등록 D폐업 O기타
		service.writeQuestion(data);
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/warn", method = RequestMethod.PATCH)
	private ResponseEntity deleteWarns(@RequestParam("warns") String warns, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		if (m != null) {
			Map<String, String> data = new HashMap<>();
			data.put("memNo", m.getMemNo());
			data.put("count", warns);
			service.deleteWarns(data);
		}
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/waiting", method = RequestMethod.POST)
	private ResponseEntity setWaiting(@RequestBody Map<String, Object> data, HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		if (m != null)
			service.setWaiting(data);
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/waiting", method = RequestMethod.GET)
	private ResponseEntity<Map> getWaiting(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		Map result = new HashMap();
		if (m != null)
			result = service.getWaiting(m.getMemNo());

		return new ResponseEntity<Map>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/member/waiting", method = RequestMethod.DELETE)
	private ResponseEntity unWaiting(HttpSession session) {
		Member m = (Member) session.getAttribute("login");
		if (m != null)
			service.unWaiting(m.getMemNo());
		return new ResponseEntity(HttpStatus.OK);
	}

}
