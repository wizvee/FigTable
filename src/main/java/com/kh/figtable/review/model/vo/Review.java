package com.kh.figtable.review.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Review {

	private String memNo;
	private String resNo;
	private String rvNo;
	private String rvRating;
	private String rvContent;
	private String[] rvImages;
	private Date rvDate;

	// JOIN시 추가 정보
	private String memName;
	private String memProfile;
	private int memRvCnt;
	private int memFollowing;
}
