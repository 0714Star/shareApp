package com.jxufe_yzt.java.common.config;


import cn.hutool.core.util.ObjectUtil;
import cn.hutool.jwt.JWT;
import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.exception.CustomException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 拦截器
 * @author yzt
 * @time 2024-12-13-15:29
 */
@Component
public class JwtInterceptor implements HandlerInterceptor {
    // 日志打印
    private static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 尝试拿去验证信息
        String token  = request.getHeader("token");
        if(ObjectUtil.isEmpty(token)) {
            token = request.getParameter("token");
        }
        // 认证token
        if(ObjectUtil.isEmpty(token)) {
            throw new CustomException(ResultCodeEnum.TOKEN_CHECK_ERROR);
        }
        User user = null;
        try{
            // 解析token数据
        }catch (Exception e) {
            throw new CustomException(ResultCodeEnum.TOKEN_CHECK_ERROR);
        }

//
//        if(ObjectUtil.isEmpty(token)){
//            token = request.getParameter("token");
//        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

}
