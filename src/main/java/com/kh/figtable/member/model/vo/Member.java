package com.kh.figtable.member.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Member {

	private String memNo;
	private String memEmail;
	private String memPassword;
	private String memPhone;
	private String memName;
	private int memRvCnt;
	private String memCode;
	private String memStatus;

}
