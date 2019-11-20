package com.kh.figtable.admin.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminOwner {
	
	private String ownNo;
	private String ownEmail;
	private String ownPhone;
	private String ownName;
	private String ownStatus;
	private String ownApply;
	private String ownReturn;
	private String resNo;
	private String resName;
	private String resAddress;
	private String resApply;
	private String license;
}
