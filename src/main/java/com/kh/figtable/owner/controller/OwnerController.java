package com.kh.figtable.owner.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.owner.model.service.OwnerService;
import com.kh.figtable.owner.model.vo.Owner;
import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
public class OwnerController {

	@Autowired
	private OwnerService service;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;

	@RequestMapping(value = "/api/owner/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<Restaurant> getOwnerRes(@PathVariable("resNo") String resNo) {
		Restaurant r = service.getOwnerRes(resNo);
		r.setOpen((r.getResWaiting() == null ? false : true));
		return new ResponseEntity<Restaurant>(r, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/ownerInfo/{ownNo}", method = RequestMethod.GET)
	private ResponseEntity<OwnerInfo> getOwnerHeader(@PathVariable("ownNo") String ownNo) {
		OwnerInfo info = service.getOwnerHeader(ownNo);
		return new ResponseEntity<OwnerInfo>(info, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/ownerThumb", method = RequestMethod.POST )
	private ResponseEntity<String> saveThumb( MultipartHttpServletRequest req) {

		// 1. 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");

		String image = "";
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
			dir.mkdirs();

		// 2. MultipartHttpServletRequest에서 filenames
		Iterator<String> fileNames = req.getFileNames();
		// 다중파일을 서버에 저장
		while (fileNames.hasNext()) {
			String formName = fileNames.next();
			MultipartFile f = req.getFile(formName);
			String original = f.getOriginalFilename();
			String ext = original.substring(original.lastIndexOf("."));
			// rename 규칙 설정
			SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
			String rename = "figtable_" + sdf.format(System.currentTimeMillis()) + ext;
			// rename된 파일명으로 파일 저장
			try {
				f.transferTo(new File(saveDir + "/" + rename));
			} catch (IOException e) {
				e.printStackTrace();
			}
			image = rename;

		}

		return new ResponseEntity<String>(image, HttpStatus.OK);

	}

	@RequestMapping(value = "/api/ownerThumb", method = RequestMethod.PATCH)
	public ResponseEntity updateThumb(@RequestBody Map<String, String> data, HttpServletRequest req) {
		String oldname = service.getOldThumb(data.get("resNo"));
		int r = service.updateThumb(data);
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");

		// 성공시 200 반환
		if (r > 0) {
			if (!oldname.substring(0, 4).equals("http")) {
				File d = new File(saveDir + "/" + oldname);
				d.delete();
			}
			return new ResponseEntity<String>(data.get("resThumb"), HttpStatus.OK);
		}
		// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/api/shopOpen", method = RequestMethod.PATCH)
	public ResponseEntity updateOpen(@RequestBody Map<String, String> data) {
		Restaurant r = new Restaurant();
		
		if((data.get("open")).equals("true")) {
			r.setResWaiting("T");
			r.setOpen(true);
		}else {
			r.setResWaiting(null);
			r.setOpen(false);
		}
		
		r.setResNo(data.get("resNo"));
		int result = service.updateOpen(r);
		
		if(result>0) {
			return new ResponseEntity<Boolean> (r.isOpen(), HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
		
	}
	
	@RequestMapping(value="/api/updateRes", method=RequestMethod.PATCH)
	public ResponseEntity updateRes(@RequestBody Restaurant restaurant) {
		
		int r = service.updateRes(restaurant);
		
		if(r>0) {
			return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);			
		}
		
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value="/api/ownerEnroll/seach", method=RequestMethod.GET)
	public ResponseEntity<List<Restaurant>> searchRes(@RequestParam String keyword) {

		List<Restaurant> list = service.searchRes(keyword);
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);

	}
	
	@RequestMapping(value="/api/ownerEnroll/select", method=RequestMethod.GET)
	public ResponseEntity<Restaurant> selectRes(@RequestParam String resNo){
		Restaurant r = service.selectRes(resNo);
		return new ResponseEntity<Restaurant>(r,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/ownerAuth", method = RequestMethod.POST )
	private ResponseEntity<String> saveAuthFile( MultipartHttpServletRequest req) {

		// 1. 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/ownerAuth");

		String image = "";
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
			dir.mkdirs();

		// 2. MultipartHttpServletRequest에서 filenames
		Iterator<String> fileNames = req.getFileNames();
		// 다중파일을 서버에 저장
		while (fileNames.hasNext()) {
			String formName = fileNames.next();
			MultipartFile f = req.getFile(formName);
			String original = f.getOriginalFilename();
			String ext = original.substring(original.lastIndexOf("."));
			// rename 규칙 설정
			SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
			String rename = "figtable_" + sdf.format(System.currentTimeMillis()) + ext;
			// rename된 파일명으로 파일 저장
			try {
				f.transferTo(new File(saveDir + "/" + rename));
			} catch (IOException e) {
				e.printStackTrace();
			}
			image = rename;

		}

		return new ResponseEntity<String>(image, HttpStatus.OK);

	}
	
	@RequestMapping(value="/api/ownerEnroll/enrollOwn", method=RequestMethod.POST)
	private ResponseEntity enrollOwn (@RequestBody Map<String, String> data) {

		System.out.println(data.get("resNo").length()==0);
		//owner
		Owner o = new Owner();
		o.setOwnEmail(data.get("ownEmail"));
		o.setOwnName(data.get("ownName"));
		o.setOwnPassword(pwEncoder.encode(data.get("ownPassword")));
		o.setOwnPhone(data.get("ownPhone"));
		o.setOwnStatics(data.get("ownStatics").equals("false")?"N":"Y");
		
		//restaurant
		Restaurant r = new Restaurant();
		r.setResNo(data.get("resNo"));
		r.setResName(data.get("resName"));
		r.setResAddress(data.get("resAddress"));
		r.setResTel(data.get("resTel"));
		r.setResLat(Double.parseDouble(data.get("resLat")));
		r.setResLong(Double.parseDouble(data.get("resLong")));
		r.setResLocationKeyword(data.get("resLocationKeyword"));
		r.setResFoodKeyword(data.get("resFoodKeyword"));
		r.setResThumb(data.get("resThumb"));
		System.out.println(data);
		
		int result = service.enrollOwn(o,r,data.get("authFile"));
		
		
		return new ResponseEntity<Boolean> (true, HttpStatus.OK);
	}

}
