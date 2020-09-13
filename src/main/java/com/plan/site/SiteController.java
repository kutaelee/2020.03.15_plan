package com.plan.site;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.plan.member.MemberController;

@Controller
public class SiteController {

	@Autowired
	MemberController mc;

	@Autowired
	SiteService ss;
	@Autowired
	SiteDAO sd;

	@PostMapping(value = "siteinsert")
	public @ResponseBody boolean siteInsert(@RequestBody HashMap<String, Object> map, HttpSession session) {
		if (mc.sessionCheck(session)) {
			int grade = (int) session.getAttribute("userGrade");
			if (grade < 1) {
				return false;
			} else {
				if (map.get("man").toString().isEmpty()) {
					map.put("manseq", null);
				} else {
					map.put("manSeq", map.get("man"));
				}
				String siteInfo = map.get("siteInfo").toString();
				if (siteInfo.lastIndexOf(",") == siteInfo.length() - 1) {
					map.put("siteInfo", siteInfo.substring(0, siteInfo.length() - 1));
				}
				ss.siteInsert(map);
				return true;
			}
		} else {
			return false;
		}

	}

	@PostMapping(value = "getSiteList")
	public @ResponseBody List<HashMap<String, Object>> getSiteList(@RequestBody HashMap<String, Object> map) {
		return sd.getSiteList(map);
	}
	
	@GetMapping(value="getSiteCount")
	public @ResponseBody int getSiteCount() {
		return sd.getSiteCount();
	}
	
	@PostMapping(value="getSiteInfoBySeq")
	public @ResponseBody HashMap<String, Object> getSiteInfoBySeq(@RequestBody HashMap<String, Object> map){
		HashMap<String,Object> resultmap=new HashMap<String,Object>();
		resultmap=sd.getSiteInfoBySeq(map);
		if(ObjectUtils.isEmpty(resultmap.get("SITE_META_USER_SEQ"))) {
			resultmap.put("SITE_META_USER_NAME","기술지원 담당자가 미정입니다.");
		}else {
			resultmap.put("SITE_META_USER_NAME","기술지원 담당자 : "+mc.getUserNameBySeq(resultmap.get("SITE_META_USER_SEQ").toString()));
		}
		return resultmap;
	}

	@GetMapping(value="lastSiteInfo")
	public @ResponseBody HashMap<String, Object> lastSiteInfo(){
		return sd.lastSiteInfo();
	}
	@PostMapping(value="getSiteListByName")
	public @ResponseBody List<HashMap<String,Object>> getSiteListByName(@RequestBody HashMap<String, Object> map){
		return sd.getSiteListByName(map);
	}
}
