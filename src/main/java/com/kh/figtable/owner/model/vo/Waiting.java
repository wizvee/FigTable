package com.kh.figtable.owner.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Waiting {

	private String wtNo;
	private String memNo;
	private String wtName;
	private String wtPhone;
	private String resNo;
	private int wtPeople;
	private Date wtTime;
	private String wtStatus;
	private int wtAge;
	private char wtGender;
}
