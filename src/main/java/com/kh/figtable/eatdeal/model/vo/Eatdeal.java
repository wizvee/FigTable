package com.kh.figtable.eatdeal.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Eatdeal {

	private String eatNo;
	private String resNo;
	private String thumb;
	private String eatFoodName;
	private String eatStatus;
	private int eatCount;
	private int eatOriginPrice;
	private double eatDiscount;
	private Date eatStartDate;
	private Date eatEndDate;
	private String eatContent;
	
}
