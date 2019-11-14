package com.kh.figtable.admin.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminOwner {
	
	private String ownNo;
	private String ownEmail;
	private String ownPassword;
	private String ownPhone;
	private String ownName;
	private String ownStatus;
	private String ownStatics;
	private String ownApply;
	private String resNo;
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
	private String resApply;
	
}
