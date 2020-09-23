package com.plan.common;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ErrorController {
	  
	  @GetMapping(value="errorcode",produces = "aplication/text;charset=utf-8")
	  public @ResponseBody String errorCode(HttpSession session) {
		  String err=(String) session.getAttribute("error");
		  return err;
	  }
}