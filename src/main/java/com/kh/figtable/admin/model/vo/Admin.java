package com.kh.figtable.admin.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Admin {
	
	private String memNo;
	private String adminEmail;
	private String adminPassword;

}
