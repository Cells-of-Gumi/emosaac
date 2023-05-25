package com.emosaac.server.dto.user;

import com.emosaac.server.domain.user.User;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String nickname;

    private String email;

    private String userName;

    private String imageUrl;

    private Integer gender;
    //나이
    private Integer age;

    private String webtoonGerne;

    private String novelGerne;

    public static UserResponse from(User user) {
        String imgUrl = "https://emosaacbucket.s3.ap-northeast-2.amazonaws.com/" + user.getImageUrl();
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl, user.getGender(), user.getAge(), user.getFavoriteWebtoonGenre(), user.getFavoriteNovelGenre());
    }
}
