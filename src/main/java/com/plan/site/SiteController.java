package com.plan.site;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
					map.put("manSeq", mc.getUserSeqByName(map.get("man").toString()));
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
	
	@GetMapping(value="getSiteList")
	public @ResponseBody List<HashMap<String,Object>> getSiteList(@RequestBody HashMap<String, Object> map){
		return sd.getSiteList(map);
	}
}
