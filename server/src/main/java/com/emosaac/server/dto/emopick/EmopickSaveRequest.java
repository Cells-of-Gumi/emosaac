package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class EmopickSaveRequest {
    @NotBlank(message = "제목 내용이 없습니다.")
    @Length(max = 50, message = "50자 이하여야 합니다.")
    private String title;

    private String content;

    private Map<Long, String> webtoonList;

    private Map<Long, String> novelList;

    public Emopick of(User user) {
        return Emopick.builder().user(user).title(title).content(content).build();
    }
}
