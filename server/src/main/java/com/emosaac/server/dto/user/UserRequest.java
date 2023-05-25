package com.emosaac.server.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserRequest {

    //닉네임
    private String nickName;
    //성별
    private Integer gender;
    //나이
    private Integer age;
    //프로필 이미지
    private String imageUrl;

    public static UserRequest of(UserRequestFile request, String imgUrl) {
        String tmpImg = null;
        if (imgUrl != null) {
            tmpImg = imgUrl.replace("https://emosaacbucket.s3.ap-northeast-2.amazonaws.com/", "");
        }
        return new UserRequest(request.getNickName(), request.getGender(), request.getAge(), tmpImg);
    }
}
