package com.jxufe_yzt.java.utils;

import cn.hutool.core.date.DateUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.digest.HmacAlgorithm;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.signers.AlgorithmUtil;
import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import com.jxufe_yzt.java.exception.CustomException;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

/**
 * Token校验
 * @author yzt
 * @time 2024-12-13-17:04
 */
@Component
public class TokenUtil {
    private static final Logger logger = LoggerFactory.getLogger(TokenUtil.class);
    @Value("${wx.tokenSecretKey}")
    private String _tokenSecretKey;
    private static String tokenSecretKey;
    @Value("${wx.standardTokenTimes}")
    private  Long _standardTokenTimes ;
    private  static Long standardTokenTimes ;
    @PostConstruct
    public void init() {
        standardTokenTimes = _standardTokenTimes;
        tokenSecretKey = _tokenSecretKey;
    }

    /**
     * 数据存储在 data 下
     * @param data
     * @return
     */
    public static String createToken(Object data) {
        // 准备数据
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("data", data);
        payload.put("expireTime", System.currentTimeMillis() + standardTokenTimes ); // 1 day过期 + 3600 * 1000

        // 使用 HMAC-SHA256 算法和密钥生成 Token
        String secretKey = "secretKey";
        String token = JWTUtil.createToken(payload, SecureUtil.md5(tokenSecretKey).getBytes());
        System.out.println("生成的 Token: " + token);
        return token;
    }

    public static String deToken(String token) {
        // 验证 Token 是否有效
        boolean isValid = JWTUtil.verify(token, SecureUtil.md5(tokenSecretKey).getBytes());
        System.out.println("Token 是否有效: " + isValid);

        if (isValid) {
            // 解析 Token 内容
            JWT jwt = JWTUtil.parseToken(token);
            // 检查是否过期
            long currentTime = System.currentTimeMillis();
            long expireTime = Long.parseLong(jwt.getPayload("expireTime").toString());
            // 到期 | 超出最大期限 需要刷新token

            if (currentTime < expireTime ) {
                System.out.println("Token 有效，解密的内容: " + jwt.getPayload());
                return jwt.getPayload().toString();
            } else {
                throw new CustomException(ResultCodeEnum.TOKEN_CHECK_ERROR);
            }
        } else {
            System.out.println("Token 无效！");
            throw new CustomException(ResultCodeEnum.TOKEN_CHECK_ERROR);
        }

    }

}
