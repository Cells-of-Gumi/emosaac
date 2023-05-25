package com.emosaac.server.security.oauth2;

import com.emosaac.server.common.exception.ArgumentMismatchException;
import com.emosaac.server.config.properties.AppProperties;
import com.emosaac.server.domain.user.AuthProvider;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.repository.user.UserRefreshTokenRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.security.TokenAuthenticationFilter;
import com.emosaac.server.security.TokenProvider;
import com.emosaac.server.security.oauth2.user.OAuth2UserInfo;
import com.emosaac.server.security.oauth2.user.OAuth2UserInfoFactory;
import com.emosaac.server.utils.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.emosaac.server.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);

    private final TokenProvider tokenProvider;

    private final AppProperties appProperties;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    private final UserRepository userRepository;

    private final UserRefreshTokenRepository userRefreshTokenRepository;

//    private final AuthProvider providerType;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication); // 여기에 토큰 담아줌

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        System.out.println("oauth Success");


        clearAuthenticationAttributes(request, response);
//        CookieUtils.addCookie(response, "code", code, 180);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new ArgumentMismatchException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String token = tokenProvider.createToken(authentication);

        CookieUtils.addCookie(response, "accessToken", token, 180);

        String userEmail = authentication.getName();


//        Optional<User> userOptional = userRepository.findByEmail(userEmail); //원래 코드

//        UserResponse user = UserResponse.from(userOptional.get());

        boolean flag = false;


        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        String providerType =  (String) authToken.getAuthorizedClientRegistrationId();


        Optional<User> userOptional = userRepository.findByEmailANDProviderType(authentication.getName(), providerType);

        if(userOptional.isPresent()) {
            if(userOptional.get().getFavoriteWebtoonGenre()!=null && !userOptional.get().getFavoriteWebtoonGenre().equals("")
            && userOptional.get().getFavoriteNovelGenre()!=null && !userOptional.get().getFavoriteNovelGenre().equals("") ){ //이미 회원
                flag = true;
            }
        }

        logger.info("=====providerType: {}", providerType);
        logger.info("=====userEmail: {}", userEmail);

        String code = "";
        if(flag){
            code = "200";
        }else{
            code = "201";
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .queryParam("code", code)
                .build().toUriString();


        /////////////////////////////////////////
        // refresh 토큰 설정
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                appProperties.getAuth().getTokenSecret(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );
//
//        String refreshToken = tokenProvider.createToken(authentication);
//
//        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
//        AuthProvider providerType = AuthProvider.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());
//
//        OidcUser user1 = ((OidcUser) authentication.getPrincipal());
//        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType.toString(), user1.getAttributes());
//
//        // DB 저장
//        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userInfo.getId());
//        if (userRefreshToken != null) {
////            userRefreshToken.setRefreshToken(refreshToken.getToken());
//            userRefreshToken.setRefreshToken(refreshToken);
//
//        } else {
////            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken.getToken());
//            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken);
//
//            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
//        }
//
////        int cookieMaxAge = (int) refreshTokenExpiry / 60;
//
//        CookieUtil.deleteCookie(request, response, "refresh_token");
//        CookieUtil.addCookie(response, "refresh_token", refreshToken.getToken(), cookieMaxAge);
//        CookieUtil.addCookie(response, "refresh_token", refreshToken, cookieMaxAge);
///////////////////////////////////////

    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
