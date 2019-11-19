package com.kh.figtable.eatdeal.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

import com.kh.figtable.eatdeal.model.service.EatdealService;
import com.kh.figtable.eatdeal.model.vo.Buyer;
import com.kh.figtable.eatdeal.model.vo.Eatdeal;

@RestController
public class EatdealController {

	@Autowired
	private EatdealService service;

	@RequestMapping(value = "/api/eatdeals", method = RequestMethod.GET)
	private ResponseEntity<List<Eatdeal>> getEatdeals() {

		List<Eatdeal> list = service.getEatdeals();

		return new ResponseEntity<List<Eatdeal>>(list, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/api/eatdeals/{eatNo}", method = RequestMethod.GET)
	private ResponseEntity<Eatdeal> getByEatNo(@PathVariable("eatNo") String eatNo ) {

		Eatdeal e= service.getByEatNo(eatNo);
		
		return new ResponseEntity<Eatdeal>(e, HttpStatus.OK);
		
	}
	@RequestMapping(value = "/api/payment/point", method = RequestMethod.GET)
	private ResponseEntity <String> getMemberPoint(@RequestParam String memNo) {

		String mpoint = service.getMemberPoint(memNo);
		
		return new ResponseEntity<String>(mpoint, HttpStatus.OK);
		
	}
	@RequestMapping(value = "/api/owner/eatdeal", method = RequestMethod.GET)
	private ResponseEntity <List<Eatdeal>>getByResNo(@RequestParam String resNo) {

		List<Eatdeal> list = service.getByResNo(resNo);
		
		return new ResponseEntity<List<Eatdeal>>(list, HttpStatus.OK);
		
	}

	@RequestMapping(value = "/api/owner/eatdeal/buy", method = RequestMethod.GET)
	private ResponseEntity <List<Buyer>>getBuy(@RequestParam String resNo) {

		List<Buyer> list = service.getBuy(resNo);
		
		return new ResponseEntity <List<Buyer>>(list, HttpStatus.OK);
		
	}

	@RequestMapping(value = "/api/newEat/register", method = RequestMethod.POST)
	public ResponseEntity<Integer> register(@RequestBody Eatdeal eat, HttpSession session) {
		int result = service.register(eat);
		if (result > 0) {
			// 성공시 200 반환
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		}
			// 실패 시 400 에러 반환
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}


	@RequestMapping(value = "/api/eatdeal/files", method = RequestMethod.POST)
	private ResponseEntity<String> uploadFiles(MultipartHttpServletRequest req) {
		// 1. 파일저장경로
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/eatdeal");
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
			image=rename;
		}

		return new ResponseEntity <String>(image, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/eatdeal/files", method = RequestMethod.PATCH)
	private void deleteFiles(@RequestBody Eatdeal eatdeal, HttpServletRequest req) {
		System.out.println("patch들어옴");
		String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/eatdeal");
//		 review 등록 실패 혹은 취소 시 파일 삭제 로직
		if (eatdeal.getThumb()!=null) {
			File f = new File(saveDir+"/"+eatdeal.getThumb());
			f.delete();
		}
	}

	@RequestMapping(value = "/api/owner/eatdeal/delete", method = RequestMethod.PATCH)
	private ResponseEntity<Integer> deleteEat(@RequestBody Map<String, String> data) {
		
		int result=service.deleteEat(data);
		if (result > 0) {
			// 성공시 200 반환
			return new ResponseEntity(HttpStatus.OK);
		}
			// 실패 시 400 에러 반환
		return new ResponseEntity<Integer>(result, HttpStatus.BAD_REQUEST);
	}
	

	@RequestMapping(value = "/api/owner/eatdeal/extend", method = RequestMethod.PATCH)
	public ResponseEntity<Integer> extendEat(@RequestBody Map<String, String> data) {
		int result = service.extendEat(data);
		if (result > 0) {
			System.out.println(result);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
	}

		@RequestMapping(value = "/api/owner/eatdeal/confirm", method = RequestMethod.PATCH)
		public ResponseEntity<List<Buyer>> confirmEat(@RequestBody Map<String, String> data) {
			
			int result = service.confirmEat(data);
			if (result > 0) {
				String resNo=data.get("resNo");
				List<Buyer> list = service.getBuy(resNo);
				return new ResponseEntity<List<Buyer>>(list, HttpStatus.OK);
			}
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}




}
