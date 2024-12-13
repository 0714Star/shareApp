package com.jxufe_yzt.java.common;

import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * @author yzt
 * @time 2024-12-13-14:38
 */
@Getter
@Setter
public class Result {
    private String code;
    private String msh;
    private Object data;

    private Result(Object data) {
        this.data = data;
    }

    public Result(){}

    /**
     * sucess 无返回值
     * @return
     */
    public static Result success(){
        Result tResult = new Result();
        tResult.setCode(ResultCodeEnum.SUCCESS.code);
        tResult.setMsh(ResultCodeEnum.SUCCESS.msg);
        return tResult;
    }

    public static Result success(Object data) {
        Result tResult = new Result();
        tResult.setCode(ResultCodeEnum.SUCCESS.code);
        tResult.setMsh(ResultCodeEnum.SUCCESS.msg);
        tResult.setData(data);
        return tResult;
    }

    /**
     * error 错误
     * @return
     */
    public static Result error() {
        Result tResult = new Result();
        tResult.setCode(ResultCodeEnum.SYSTEM_ERROR.code);
        tResult.setMsh(ResultCodeEnum.SYSTEM_ERROR.msg);
        return tResult;
    }
    public static Result error(String code , String msg) {
        Result tResult = new Result();
        tResult.setCode(code);
        tResult.setMsh(msg);
        return tResult;
    }


}