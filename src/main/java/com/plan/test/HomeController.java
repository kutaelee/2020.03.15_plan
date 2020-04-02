package com.plan.test;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@GetMapping(value = "/")
	public String home() {
		return "index";
	}
	@GetMapping(value = "/page/{pageName}")
	public String page(@PathVariable String pageName) {
		if(pageName.isBlank()||pageName.isEmpty()) {
			return "notfound";
		}
		return pageName;
	}
	/*
	 * @GetMapping(value = "/plan") public String plan() { return "plan"; }
	 * 
	 * @GetMapping(value = "/management") public String management() { return
	 * "management"; }
	 * 
	 * @GetMapping(value = "/oldplan") public String oldplan() { return "oldplan"; }
	 */
	
}
