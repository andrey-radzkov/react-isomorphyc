package com.radzkov.uiserver;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;

import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

/**
 * @author Radzkov Andrey
 */
@Component
public class BasicAuthorizationHeaderFilter extends ZuulFilter {


    @Override
    public String filterType() {

        return PRE_TYPE;
    }

    @Override
    public int filterOrder() {

        return 10;
    }

    @Override
    public boolean shouldFilter() {

        return true;
    }

    @Override
    public Object run() {

        RequestContext ctx = RequestContext.getCurrentContext();
        String requestURL = ctx.getRequest().getRequestURL().toString();
        if (!(requestURL.contains("/app") || requestURL.contains("/api") || requestURL.contains("/vk")
                || requestURL.contains("/uaa") || requestURL.contains("firebase"))) {
            ctx.addZuulRequestHeader("Authorization", "Basic " + "d2FzaDp3YXNocGFzc3dvcmQ=");
        }
        return null;
    }

}
