package com.emosaac.server.dto.user;

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
public class UserGenreRequest {

    @Size(min=3, max=3)
    private List<Long> gerne;

//    private static List<String> novelGerne;

}
