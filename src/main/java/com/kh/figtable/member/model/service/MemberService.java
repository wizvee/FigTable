package com.kh.figtable.member.model.service;

import java.util.List;
import java.util.Map;

import com.kh.figtable.member.model.vo.Member;
import com.kh.figtable.restaurant.model.vo.Restaurant;

public interface MemberService {

	int register(Member mem);

	Member login(Member mem);
	
	int likesRes(Map<String, String> data);
	
	int unlikesRes(Map<String, String> data);
	
	List<Restaurant> getLikes(String memNo);

}
