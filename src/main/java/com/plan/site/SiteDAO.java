package com.plan.site;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SiteDAO {
	@Autowired
	private SqlSession sqlsession;
	
	public void siteInsert(HashMap<String, Object> map) {
		sqlsession.insert("site.siteInsert",map);
	}

	public List<HashMap<String, Object>> getSiteList(HashMap<String, Object> map) {
		return sqlsession.selectList("site.getSiteList", map);
	}

}
