package com.jxufe_yzt.java.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.common.enums.ResultCodeEnum;
import com.jxufe_yzt.java.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * @author yzt
 * @time 2024-12-17-20:04
 */
@Service
public class WXService {
    @Value("${wx.appId}")
    private String appId;
    @Value("${wx.secretId}")
    private String secretId;

    private Integer ErrorCode = 40029;
    private static final String WX_LOGIN_URL = "https://api.weixin.qq.com/sns/jscode2session";

    /**
     * 获取到用 微信用户 SessionKey 、 Openid
     * @param code
     * @return
     */
    public Map<String,String> getWxData(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String requestUrl = String.format("%s?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
                WX_LOGIN_URL,appId,secretId,code);

        // 发起请求并处理响应
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(requestUrl, String.class);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseBody = responseEntity.getBody();
            assert responseBody != null;
            try{
                Map map = new ObjectMapper().readValue(responseBody, Map.class);
                if(map.containsKey("errcode") && ErrorCode.equals(map.get("errcode"))){
                    throw new CustomException(ResultCodeEnum.PASSWORD_ERROR);
                }
                return map; // 转为 Map

            }catch (JsonProcessingException e){
                throw new CustomException(ResultCodeEnum.PASSWORD_ERROR);
            }
        } else {
            throw new RuntimeException("微信登录失败，状态码：" + responseEntity.getStatusCodeValue());
        }
    }

//    public String getPhoneNumber(String code, String encryptedData, String iv){
//        // 1. 使用 code 获取 session_key 和 openid
//        String url = String.format("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
//                appId, secretId, code);
//        return "";
//    }

}
