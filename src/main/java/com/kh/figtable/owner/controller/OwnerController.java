package com.kh.figtable.owner.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.owner.model.service.OwnerService;
import com.kh.figtable.owner.model.vo.OwnerInfo;
import com.kh.figtable.restaurant.model.vo.Restaurant;

@RestController
public class OwnerController {

	@Autowired
	private OwnerService service;

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

	@RequestMapping(value = "/api/ownerThumb/{resNo}", method = { RequestMethod.GET, RequestMethod.POST })
	private ResponseEntity<String> saveThumb(@PathVariable("resNo") String resNo, MultipartHttpServletRequest req) {

		Restaurant r = new Restaurant();
		r.setResNo(resNo);

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
			r.setResThumb(rename);
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
		System.out.println("바뀜");
		System.out.println(data.get("resNo"));
		System.out.println(data.get("open"));
		
		if((data.get("open")).equals("true")) {
			r.setResWaiting("T");
			r.setOpen(true);
		}else {
			r.setResWaiting(null);
			r.setOpen(false);
		}
		
		r.setResNo(data.get("resNo"));
		System.out.println(r.isOpen());
		int result = service.updateOpen(r);
		
		if(result>0) {
			return new ResponseEntity<Boolean> (r.isOpen(), HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.BAD_REQUEST);
		
	}

}
