package com.kh.figtable.admin.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminReview {
	private String MemNo;
	private String memName;
	private String rvNo;
	private String rvContent;
	private String rvWarn;
	private String resNo;
	private Date rvDate;
	private String resName;
	private String resAddress;
}
