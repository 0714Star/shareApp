package com.jxufe_yzt.java.exception;


import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 全局异常捕获
 * @author yzt
 * @time 2024-12-13-16:44
 */
@ControllerAdvice(basePackages = "com.jxufe_yzt_java.controller")
public class GlobalExceptionHandler {
    
    private static final Log log = LogFactory.get();

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result error(HttpServletRequest request, Exception e) {
        log.error("异常信息",e);
        return Result.error();
    }
    @ExceptionHandler(CustomException.class)
    @ResponseBody // 返回 JSON 串
    public Result customError(HttpServletRequest request, CustomException e) {
        log.error("可标记异常",e);
        return Result.error(e.getCode(), e.getMessage());
    }
}
