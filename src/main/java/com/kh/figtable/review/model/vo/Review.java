package com.kh.figtable.review.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Review {

	private String rvNo;
	private String memNo;
	private String resNo;
	private int rvRating;
	private String rvContent;
	private String[] rvImages;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date rvDate;
	private String rvWarn;
	private int rvLove;

	// JOIN시 추가 정보
	private String memName;
	private String memProfile;
	private int memRvCnt;
	private int memFwCnt;
	private int loveCnt;
	private boolean isLoved;
}
