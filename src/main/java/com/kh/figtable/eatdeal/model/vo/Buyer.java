package com.kh.figtable.eatdeal.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Buyer {

	private String payNo;
	private String eatNo;
	private String eatFoodName;
	private String memName;
	private String memNo;
	private String thumb;
	private Date buyDate;
	private String buyStatus;
	
}