package com.plan.site;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class SiteService {

	@Autowired
	SiteDAO sd;
	
	public void siteInsert(HashMap<String, Object> map) {
		sd.siteInsert(map);
	}

	public void siteDelete(HashMap<String, Object> map) {
		sd.siteDelete(map);
		
	}

	public void siteModify(HashMap<String, Object> map) {
		sd.siteModify(map);
		
	}

}
