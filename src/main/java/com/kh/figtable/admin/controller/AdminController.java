package com.kh.figtable.admin.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.admin.model.service.AdminService;
import com.kh.figtable.admin.model.vo.AdminOwner;
import com.kh.figtable.admin.model.vo.AdminQna;
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
	
	@RequestMapping(value = "/api/adminResList", method = RequestMethod.GET)
	private ResponseEntity<List<Restaurant>> getResList(){
		List<Restaurant> list = service.getResList();
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
	}
	

	//매장 썸네일 등록
	@RequestMapping(value="/api/adminFile", method=RequestMethod.POST)
	private ResponseEntity<String> uploadFile(MultipartHttpServletRequest req){
		//파일 저장 경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");
		String image = "";

		// 저장경로가 없으면 생성
		File dir = new File(saveDir);
		if (!dir.exists()) {
			dir.mkdirs();
		}

		//multipart request에서 fileNames 가져오기
		Iterator<String> fileNames = req.getFileNames();
		while(fileNames.hasNext()){
			String forName = fileNames.next();
			MultipartFile f = req.getFile(forName);
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
			image = rename;
		}
		return new ResponseEntity<String>(image, HttpStatus.OK);
	}


	@RequestMapping(value="/api/adminFile", method=RequestMethod.PATCH)
	private void insertResFile(@RequestBody Restaurant res, HttpServletRequest req) {
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");
		//매장 등록 실패시 파일 삭제
		if(res.getResThumb() != null) {
			File f = new File(saveDir + "/" + res.getResThumb());
			f.delete();
		}
	}

	@RequestMapping(value="/api/adminInsertRes", method=RequestMethod.POST)
	public ResponseEntity<Integer> insertRes(@RequestBody Restaurant res){
		int result = service.insertRes(res);
		if(result>0) {
			//성공시 200 반환
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		}
		//실패시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST); 
	}

	@RequestMapping(value="/api/adminCloseRes/{resNo}", method = RequestMethod.POST)
	public ResponseEntity<List<Restaurant>> CloseRes(@PathVariable("resNo") String resNo) {
		int result = service.closeRes(resNo);
		List<Restaurant> list = null;
		if(result > 0) {
			list = service.getResList();
			return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		}
		//실패시 400에러
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value="/api/adminApplyRes/{resNo}", method = RequestMethod.POST)
	public ResponseEntity<List<Restaurant>> applyRes(@PathVariable("resNo") String resNo) {
		
		int result = service.applyRes(resNo);
		List<Restaurant> list = null;
		if(result > 0) {
			list = service.getResList();
			return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		}
		//실패시 400에러
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}


	
	
	//owner
	@RequestMapping(value="/api/adminOwners", method=RequestMethod.GET)
	private ResponseEntity<List<AdminOwner>> getOwnersByApply(){
		List<AdminOwner> list = service.getOwnersByApply();

		return new ResponseEntity<List<AdminOwner>>(list, HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/adminOwner/apply", method=RequestMethod.POST)
	private ResponseEntity<Integer> applyOwner(@RequestBody AdminOwner owner){
		if(!owner.getOwnApply().equals('A')) {
			int updateOwnApply = service.updateOwnApply(owner.getOwnNo());
		}
		int insertResOwn = service.insertResOwn(owner);
		if(insertResOwn > 0) {
			return new ResponseEntity<Integer>(insertResOwn, HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.BAD_REQUEST); 
	}
	
	@RequestMapping(value="/api/adminOwner/return", method=RequestMethod.POST)
	private ResponseEntity returnOwner(@RequestBody Map<String, String> data){
		System.out.println(data);
		if(!data.get("ownerApply").equals('A')) {
			int updateOwnApply = service.updateOwnApply(data.get("ownerNo"));
		}
		int returnResOwn = service.returnResOwn(data);
		if(returnResOwn > 0) {
			int delLicense = service.delLicense(data);
			return new ResponseEntity<Integer>(returnResOwn, HttpStatus.OK);
		}
		
		return new ResponseEntity(HttpStatus.BAD_REQUEST); 
	}




	//review
	@RequestMapping(value="/api/adminReviews", method=RequestMethod.GET)
	private ResponseEntity<List<AdminReview>> getReviews(){
		List<AdminReview> list = service.getReviews();
		return new ResponseEntity<List<AdminReview>>(list, HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/adminReturnReview/{rvNo}", method = RequestMethod.POST)
	public ResponseEntity returnReview(@PathVariable("rvNo") String rvNo) {
		service.returnReview(rvNo);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/adminRemoveReview/{rvNo}", method = RequestMethod.PATCH)
	private ResponseEntity<List<AdminReview>> removeReview(@PathVariable("rvNo") String rvNo){
		AdminReview r = service.getMember(rvNo);
		//경고 수 3회 미만이면 경고 +1 
		if(r.getMemWrCnt() < 3) {
			int wcIncrese = service.wcIncrease(r.getMemNo());
		}
		if(r.getRvLove() > 0 ) {
			int removeLv = service.removeLv(rvNo);
		}
		int remove = service.removeReview(rvNo);
		if(remove>0) {
			List<AdminReview> reviews = service.getReviews();
			return new ResponseEntity<List<AdminReview>>(reviews, HttpStatus.OK);
		}
		//실패시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}


	
	
	//Qna
	@RequestMapping(value="/api/amdinQnasE", method = RequestMethod.GET)
	private ResponseEntity<List<AdminQna>> getQnasE(){
//		List<AdminQna> list = service.getQnas();
		//System.out.println(list);
		return new ResponseEntity<List<AdminQna>>(HttpStatus.OK);
	}
	
	//카테고리별로 가져오기
	@RequestMapping(value="/api/adminQuestion", method = RequestMethod.GET)
	private ResponseEntity<List<Map>> getQnas(@RequestParam("category") String category){
		List<Map> data = service.getQnas(category);
		return new ResponseEntity<List<Map>>(data, HttpStatus.OK);
	}
	
	//답변 없는 확인 기능
	@RequestMapping(value="/api/adminQanCheck", method = RequestMethod.POST)
	private ResponseEntity<List<Map>> qnaCheck(@RequestBody Map<String, Object> data){
		service.qnaCheck(data);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	//답변기능
	@RequestMapping(value="/api/adminQuestion/answer", method = RequestMethod.POST)
	private ResponseEntity<List<Map>> qnaAnswer(@RequestBody Map<String, Object> data){
		
		int answer = service.qnaAnswer(data);
		if(answer>0) {
			service.answerCheck(data);
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}
	
}
