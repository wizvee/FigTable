package com.kh.figtable.admin.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminQna {
	
	private String memNo;
	private String memName;
	private String targetMemNo;
	private String category;
	private String answer;
	private Date qnaDate;
	private String content;
	
	
	
}
