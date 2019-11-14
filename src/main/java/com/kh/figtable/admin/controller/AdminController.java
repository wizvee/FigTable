package com.kh.figtable.admin.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.admin.model.service.AdminService;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminReview;
import com.kh.figtable.restaurant.model.vo.Restaurant;


@RestController
public class AdminController {

	@Autowired
	private AdminService service;
	
	//restaurant 등록 신청 내역 가져오기
	@RequestMapping(value = "/api/adminRestaurnats", method = RequestMethod.GET)
	private ResponseEntity<List<Restaurant>> getRestaurantsByApply(){
		List<Restaurant> list = service.getRestaurantsByApply();
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/api/adminOwners", method=RequestMethod.GET)
	private ResponseEntity<List<AdminOwner>> getOwnersByApply(){
		List<AdminOwner> list = service.getOwnersByApply();
	
		return new ResponseEntity<List<AdminOwner>>(list, HttpStatus.OK);
	}
	
	
//	@RequestMapping(value="/api/adminInsertRes", method = RequestMethod.GET)
//	private ResponseEntity<Integer> insertRes(@RequestBody Restaurant res) {
//		int result = service.insertRes(res);
//		System.out.println(result);
//		
//		return new ResponseEntity<Integer>(result, HttpStatus.OK);
//	}
	
	
	//review
	@RequestMapping(value="/api/adminReviews", method=RequestMethod.GET)
	private ResponseEntity<List<AdminReview>> getReviews(){
		List<AdminReview> list = service.getReviews();
		return new ResponseEntity<List<AdminReview>>(list, HttpStatus.OK);
	}
	
	//매장 썸네일 등록
	@RequestMapping(value="/api/adminFile", method=RequestMethod.POST)
	private ResponseEntity<String> uploadFile(MultipartHttpServletRequest req){
		//파일 저장 경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");
		String image = "";
		
		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists())
		dir.mkdirs();
		
		//multipart request에서 fileName 가져오기
		MultipartFile f = req.getFile("resThumb");
		String original = f.getOriginalFilename();
		String ext = original.substring(original.lastIndexOf("."));
		// rename 규칙 설정
		SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd_HHmmssSSS");
		String rename = "restaurant_" + sdf.format(System.currentTimeMillis()) + ext;
		// rename으로 파일 저장
		try {
			f.transferTo(new File(saveDir + "/" + rename));
		} catch (IOException e) {
			e.printStackTrace();
		}
		image = "/figtable/resources/upload/restaurant/" + rename;
	
		return new ResponseEntity<String>(image, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/api/adminFile", method=RequestMethod.PATCH)
	private void deleteFile(@RequestBody Restaurant res, HttpServletRequest req) {
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");
		//매장 등록 실패시 파일 삭제
		//res.getResThumb()
		File f = new File(saveDir + res.getResThumb().substring(res.getResThumb().lastIndexOf("/")));
		f.delete();
	}
	
	
	
}
