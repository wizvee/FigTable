package com.kh.figtable.owner.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Owner {
	
	private String ownNo;
	private String ownEmail;
	private String ownPassword;
	private String ownPhone;
	private String ownName;
	private String ownStatus;
	private String ownStatics;
	private String ownApply;
	

}
