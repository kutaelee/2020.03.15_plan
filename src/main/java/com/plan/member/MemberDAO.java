package com.plan.member;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {
	@Autowired
	private SqlSession sqlsession;
	
	public List<HashMap<String,Object>> showmember(MemberVO mv){
		return sqlsession.selectList("member.showmember",mv);
	}
	public MemberVO idCheck(String id) {
		return sqlsession.selectOne("member.idcheck",id);
	}
	public MemberVO emailCheck(String email) {
		return sqlsession.selectOne("member.emailcheck",email);
	}
	public void memberInsert(MemberVO mv) {
		sqlsession.insert("member.join",mv);
	}
	public MemberVO memberLogin(String id){
		return sqlsession.selectOne("member.idcheck",id);	
	}
	public MemberVO memberSelect(String id) {
		return sqlsession.selectOne("member.memberselect",id);	
	}
	public void authUpdate(String id) {
		sqlsession.update("member.authupdate",id);
	}
	public String findId(String email) {
		return sqlsession.selectOne("member.findid",email);
	}
	public String findPw(MemberVO mv) {
		return sqlsession.selectOne("member.findpw",mv);
	}
	public void privateKeyChange(MemberVO mv) {
		sqlsession.update("member.privatekeychange",mv);
	}
	public String memberCheck(MemberVO mv) {
		return sqlsession.selectOne("member.membercheck",mv);
	}
	public void memberPwUpdate(MemberVO mv) {
		sqlsession.update("member.pwupdate",mv);
	}
	public void emailUpdate(MemberVO mv) {
		sqlsession.update("member.emailupdate",mv);
	}
	public void tokenUpdate(MemberVO mv) {
		sqlsession.update("member.tokenupdate",mv);
	}
	public HashMap<String,String> MemberCheckSeq (int seq){
		return sqlsession.selectOne("member.MemberCheckSeq",seq);
	}
	public String seqSelectPw(int seq) {
		return sqlsession.selectOne("member.seqSelectPw",seq);
	}
	public String seqSelectId(int seq) {
		return sqlsession.selectOne("member.seqSelectId",seq);
	}
	public void memberSecession(int seq) {
		sqlsession.delete("member.memberSecession",seq);
	}
	public void privatekeySetNull(String id) {
		sqlsession.update("member.privatekeySetNull",id);
	}
}