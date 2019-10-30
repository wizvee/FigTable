package com.kh.figtable.restaurant.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Restaurant {

	private String resNo;
	private String memNo;
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

}
