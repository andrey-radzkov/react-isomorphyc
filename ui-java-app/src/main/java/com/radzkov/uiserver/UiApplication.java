package com.radzkov.uiserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@SpringBootApplication
@EnableZuulProxy
@Controller
public class UiApplication {

  public static void main(String[] args) {

    SpringApplication.run(UiApplication.class, args);
  }

  @GetMapping("/**/{[path:[^\\\\.]*}")
  public String index(final HttpServletRequest request) {
    final String url = request.getRequestURI();

    if (url.contains(".")) {
      return String.format("forward:/%s", url);
    }
    return "forward:/index.html";//tODO: remove
  }


}
