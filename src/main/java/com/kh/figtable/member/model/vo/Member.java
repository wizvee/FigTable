package com.kh.figtable.member.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Member {

	private String memNo;
	private String memEmail;
	private String memPassword;
	private String memPhone;
	private String memName;
	private String memProfile;
	private int memRvCnt;
	private int memFwCnt;
	private int memWrCnt;
	private String memStatus;

	// isFollowing
	private boolean isFollowing;

}
