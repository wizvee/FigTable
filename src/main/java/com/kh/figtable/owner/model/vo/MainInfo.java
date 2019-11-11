package com.kh.figtable.owner.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.Data;

@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MainInfo {

	private String resNo;
	private String resName;
	private String resLocationKeyword;
	private String resFoodKeyword;
	private String resThumb;
	private int resViews;
	private int resRating;
	private int resReviews;
	private String ownNo;
	private String ownName;
	private String resWaiting;
	
	
}
