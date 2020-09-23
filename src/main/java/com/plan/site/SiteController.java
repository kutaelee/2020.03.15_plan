package com.plan.site;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
					map.put("siteInfo", null);
				}
				
				map.put("name",map.get("name").toString().trim());
				ss.siteInsert(map);
				return true;
			}
		} else {
			return false;
		}

	}
	@PostMapping(value = "siteModify")
	public @ResponseBody boolean siteModify(@RequestBody HashMap<String, Object> map, HttpSession session) {
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
				ss.siteModify(map);
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
		resultmap=getUserNameBySeq(resultmap);

		return resultmap;
	}

	@GetMapping(value="lastSiteInfo")
	public @ResponseBody HashMap<String, Object> lastSiteInfo(){
		HashMap<String,Object> resultmap=new HashMap<String,Object>();
		resultmap=sd.lastSiteInfo();
		resultmap=getUserNameBySeq(resultmap);
		
		return resultmap;
	}

	@PostMapping(value="getSiteListByName")
	public @ResponseBody List<HashMap<String,Object>> getSiteListByName(@RequestBody HashMap<String, Object> map){
		return sd.getSiteListByName(map);
	}
	@PostMapping(value="siteDelete")
	public @ResponseBody boolean siteDelete(@RequestBody HashMap<String, Object> map) {
		ss.siteDelete(map);
		return true;
	}
	
	public HashMap<String,Object> getUserNameBySeq(HashMap<String,Object> resultmap) {
		if(ObjectUtils.isEmpty(resultmap.get("SITE_META_USER_SEQ"))) {
			resultmap.put("SITE_META_USER_NAME","미정");
		}else {
			resultmap.put("SITE_META_USER_NAME",mc.getUserNameBySeq(resultmap.get("SITE_META_USER_SEQ").toString()));
		}
		return resultmap;
	}
}
