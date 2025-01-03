package com.jxufe_yzt.java.exception;

import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 自定义异常
 * @author yzt
 * @time 2024-12-13-16:52
 */
public class CustomException extends RuntimeException {
    private String code;
    private String msg;

    public CustomException(ResultCodeEnum resultCodeEnum) {
        this.code = resultCodeEnum.code;
        this.msg = resultCodeEnum.msg;
    }
    public CustomException(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
