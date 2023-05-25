package com.emosaac.server.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserRequestFile {

    //닉네임
    @NotNull(message = "빈문자열을 허용하지 않습니다.")
    @Length(min = 2, max = 10, message = "2~10자의 닉네임만 가능합니다.")
    private String nickName;
    //성별
    private Integer gender;
    //나이
    private Integer age;
    //프로필 이미지
//    private String imageUrl;

    private MultipartFile file;
}
