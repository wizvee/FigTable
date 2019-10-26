package com.kh.figtable.member.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Member {

	private int memNo;
	private String memEmail;
	private String memPassword;
	private String memPhone;
	private String memName;
	private String memCode;
	private String memStatus;

}
