package com.kh.figtable.member.model.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ser.std.StdArraySerializers.IntArraySerializer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

	private boolean isFollowing;
	private int memPoint;
	private int followingCnt;
	private int eatdealCnt;
	private boolean isWaiting;

	@Override
	public int hashCode() {
		return Integer.parseInt(memNo.substring(1));
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Member) {
			Member m = (Member) obj;
			if (this.hashCode() == m.hashCode())
				return true;
			else
				return false;
		}
		return false;
	}

}
