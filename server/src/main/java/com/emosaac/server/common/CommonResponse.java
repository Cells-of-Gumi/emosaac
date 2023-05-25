package com.emosaac.server.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Getter
@NoArgsConstructor
@AllArgsConstructor

public class CommonResponse<T>{

    private int status;
    private String message;
    private T data;

    public CommonResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public CommonResponse(T data) {
        this.data = data;
    }

    public static CommonResponse<?> of(HttpStatus httpStatus, String message) {
        int status = Optional.ofNullable(httpStatus)
                .orElse(HttpStatus.OK)
                .value();
        return new CommonResponse<>(status, message);
    }

    public static <T> CommonResponse<T> of(HttpStatus httpStatus,T data) {
        int status = Optional.ofNullable(httpStatus)
                .orElse(HttpStatus.OK)
                .value();
        return new CommonResponse<>(data);
    }

    public static <T> CommonResponse<T> of(HttpStatus httpStatus, String message, T data) {
        int status = Optional.ofNullable(httpStatus)
                .orElse(HttpStatus.OK)
                .value();
        return new CommonResponse<>(status, message, data);
    }

    public static CommonResponse<?> fail(HttpStatus httpStatus, String message) {
        return new CommonResponse<>(httpStatus.value(), message, null);
    }


}
