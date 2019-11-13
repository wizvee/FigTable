package com.kh.figtable.owner.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kh.figtable.owner.model.service.OwnerService;
import com.kh.figtable.owner.model.vo.OwnRestaurant;
import com.kh.figtable.owner.model.vo.OwnerInfo;


@RestController	
public class OwnerController {

	@Autowired
	private OwnerService service;	
	
	@RequestMapping(value ="/api/owner/{resNo}", method = RequestMethod.GET)
	private ResponseEntity<OwnRestaurant> getOwnerRes(@PathVariable("resNo") String resNo)
	{
		OwnRestaurant r = service.getOwnerRes(resNo);
		return new ResponseEntity<OwnRestaurant>(r, HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/ownerInfo/{ownNo}", method=RequestMethod.GET)
	private ResponseEntity<OwnerInfo> getOwnerHeader(@PathVariable("ownNo") String ownNo){
		OwnerInfo info = service.getOwnerHeader(ownNo);
		return new ResponseEntity<OwnerInfo>(info, HttpStatus.OK);
	}
	
	@RequestMapping(value="/api/ownerThumb/{resNo}", method = {RequestMethod.GET,RequestMethod.POST})
	private ResponseEntity<String> updateThumb(@PathVariable("resNo") String resNo, MultipartHttpServletRequest req){

		OwnRestaurant r = new OwnRestaurant();
		r.setResNo(resNo);
		
		// 1. 파일저장경로
				String saveDir = req.getSession().getServletContext().getRealPath("/resources/upload/restaurant");
				String image="";
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
					image="/figtable/resources/upload/restaurant/" + rename;
					r.setResThumb(image);
				}
				
				try {
					service.updateThumb(r);
				}catch(Exception e) {
					e.printStackTrace();
				}
				
				//삭제 아직 안함!
				return new ResponseEntity<String>(image, HttpStatus.OK);

	}
	
}
