package com.kh.figtable.restaurant.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Restaurant {

	private String resNo;
	private String memNo;
	private String resName;
	private String resLocationKeyword;
	private String resFoodKeyword;
	private String resAddress;
	private String resOpenDay;
	private String resCloseTime;
	private String resMenuTitle;
	private String resMenuPrice;
	private String resTel;
	private double resLat;
	private double resLong;
	private int resViews;
	private String resReserve;
	private String resWaiting;

}
