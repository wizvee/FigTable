package com.kh.figtable.restaurant.model.vo;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Restaurant {

	private String resNo;
	private String ownNo;
	private String resName;
	private String resLocationKeyword;
	private String resFoodKeyword;
	private String resThumb;
	private String resAddress;
	private String[] resOpenDay;
	private String[] resCloseTime;
	private String[] resMenuTitle;
	private String[] resMenuPrice;
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

	// for member
	private boolean isLiked;
	private int wtRemining;
	private List<Map<String, Object>> eatdealArr;

	// for owner
	private boolean isOpen;

}
