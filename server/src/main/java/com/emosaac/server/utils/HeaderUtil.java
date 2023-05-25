package com.emosaac.server.utils;

import javax.servlet.http.HttpServletRequest;

public class HeaderUtil {

    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader(HEADER_AUTHORIZATION);

        if (headerValue == null) {
            return null;
        }

        if (headerValue.startsWith(TOKEN_PREFIX)) {
//            System.out.println("TOKEN_PREFIX "+headerValue.substring(TOKEN_PREFIX.length()));
            return headerValue.substring(TOKEN_PREFIX.length());
        }

        return null;
    }
}
