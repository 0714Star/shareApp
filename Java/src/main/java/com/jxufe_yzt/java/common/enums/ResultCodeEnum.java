package com.jxufe_yzt.java.common.enums;

public enum ResultCodeEnum {
    // 基本协议码
    SUCCESS ("200","成功"),
    PARAM_ERROR("400","请求参数异常"),
    TOKEN_CHECK_ERROR("401","未授权（需要身份验证）"),
    PERMISSION_DENIED("402","资源未找到"),
    SYSTEM_ERROR("500","服务器内部异常"),
    SERVER_DIE("502","网关错误")

    // 业务协议码

    ;

    public String code;

    public String msg;

    ResultCodeEnum(String code , String msg){
        this.code = code;
        this.msg = msg;
    }
}
