package com.plan.member;

import org.springframework.stereotype.Component;

@Component
public class MemberVO {
	private int USER_SEQ; // 회원번호
	private String USER_ID;// 회원아이디 외래키
	private String USER_EMAIL;// 회원 이메일 알림보낼때 사용
	private String USER_PASSWORD;// 회원비밀번호
	private String USER_PRIVATEKEY;// 회원 등록할때 인증메일 파라미터 개인키
	private String USER_AUTH; // 이메일 인증 여부
	private String USER_NAME;

	public int getUSER_SEQ() {
		return USER_SEQ;
	}

	public void setUSER_SEQ(int uSER_SEQ) {
		USER_SEQ = uSER_SEQ;
	}

	public String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}

	public String getUSER_EMAIL() {
		return USER_EMAIL;
	}

	public void setUSER_EMAIL(String uSER_EMAIL) {
		USER_EMAIL = uSER_EMAIL;
	}

	public String getUSER_PASSWORD() {
		return USER_PASSWORD;
	}

	public void setUSER_PASSWORD(String uSER_PASSWORD) {
		USER_PASSWORD = uSER_PASSWORD;
	}

	public String getUSER_PRIVATEKEY() {
		return USER_PRIVATEKEY;
	}

	public void setUSER_PRIVATEKEY(String uSER_PRIVATEKEY) {
		USER_PRIVATEKEY = uSER_PRIVATEKEY;
	}

	public String getUSER_AUTH() {
		return USER_AUTH;
	}

	public void setUSER_AUTH(String uSER_AUTH) {
		USER_AUTH = uSER_AUTH;
	}

	public String getUSER_NAME() {
		return USER_NAME;
	}

	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}

	@Override
	public String toString() {
		return "MemberVO [USER_SEQ=" + USER_SEQ + ", USER_ID=" + USER_ID + ", USER_EMAIL=" + USER_EMAIL
				+ ", USER_PASSWORD=" + USER_PASSWORD + ", USER_PRIVATEKEY=" + USER_PRIVATEKEY + ", USER_AUTH="
				+ USER_AUTH + ", USER_NAME=" + USER_NAME + "]";
	}

}
