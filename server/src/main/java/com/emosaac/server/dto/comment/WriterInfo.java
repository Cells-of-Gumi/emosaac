package com.emosaac.server.dto.comment;

import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class WriterInfo {
    private Long userId;

    private String nickname;

    private String profileImg;

    public static WriterInfo from(User user) {
        return new WriterInfo(user.getUserId(), user.getNickName(), "https://emosaacbucket.s3.ap-northeast-2.amazonaws.com/"+user.getImageUrl());
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
