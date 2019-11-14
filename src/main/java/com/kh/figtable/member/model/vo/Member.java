package com.kh.figtable.member.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Member {

	private String memNo;
	private String memEmail;
	private String memPassword;
	private String memPhone;
	private String memName;
	private String memProfile;
	private int memRvCnt;
	private int memFwCnt;
	private int memWrCnt;
	private String memStatus;
	private String resNo;
	private String ownNo;
	private String resName;
	private String resLocationKeyword;
	private String resFoodKeyword;
	private String resThumb;
	private String resAddress;
	private String resOpenDay;
	private String resCloseTime;
	private String resMenuTitle;
	private String resMenuPrice;
	private String resTel;
	private double resLat;
	private double resLong;
	private int resViews;
	private int resRating;
	private int resReviews;
	private int resLikes;
	private String resReserve;
	private String resWaiting;
	private int resWaitCnt;
	private String resApply;

}
