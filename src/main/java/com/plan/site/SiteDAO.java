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
		sqlsession.insert("site.siteInsert", map);
	}

	public List<HashMap<String, Object>> getSiteList(HashMap<String, Object> map) {
		return sqlsession.selectList("site.getSiteList", map);
	}

	public int getSiteCount() {
		return sqlsession.selectOne("site.getSiteCount");
	}

	public HashMap<String, Object> lastSiteInfo() {
		return sqlsession.selectOne("lastSiteInfo");
	}

	public HashMap<String, Object> getSiteInfoBySeq(HashMap<String, Object> map) {
		return sqlsession.selectOne("site.getSiteInfoBySeq", map);
	}

	public List<HashMap<String, Object>> getSiteListByName(HashMap<String, Object> map) {
		return sqlsession.selectList("site.getSiteListByName", map);
	}

	public void siteDelete(HashMap<String, Object> map) {
		sqlsession.delete("site.siteDelete", map);
	}

	public void siteModify(HashMap<String, Object> map) {
		sqlsession.update("site.siteModify",map);
		
	}

}
