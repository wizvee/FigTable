package com.kh.figtable.review.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Comment {
	
	private String rvcNo;
	private String rvNoRef;
	private String memNo;
	private String rvcContent;
	private boolean rvcWarn;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date rvcDate;

}
