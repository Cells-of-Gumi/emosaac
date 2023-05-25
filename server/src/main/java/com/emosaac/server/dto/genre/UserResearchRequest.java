package com.emosaac.server.dto.genre;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserResearchRequest {

    @Size(min=5, max=5)
    private Long[] webtoonId;

    @Size(min=5, max=5)
    private Long[] novelId;
}
