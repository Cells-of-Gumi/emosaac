package com.emosaac.server.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

    private boolean success;
    private String message;
    private Object data;

}
