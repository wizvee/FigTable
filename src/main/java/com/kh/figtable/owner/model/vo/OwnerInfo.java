package com.kh.figtable.owner.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OwnerInfo {

	private String ownNo;
	private String ownName;
	private char ownStatics;
	private int resCount;
	private String no;
	private String name;
}
