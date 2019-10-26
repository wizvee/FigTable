package com.kh.figtable.member.model.service;

import java.util.Map;

import com.kh.figtable.member.model.vo.Member;

public interface MemberService {

	int register(Member mem);

	Member login(Member mem);

}
