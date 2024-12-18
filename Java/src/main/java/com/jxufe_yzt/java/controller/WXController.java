package com.jxufe_yzt.java.controller;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.ObjectUtil;
import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.service.UserService;
import com.jxufe_yzt.java.service.WXService;
import com.jxufe_yzt.java.utils.TokenUtil;
import jakarta.annotation.Resource;
import org.apache.el.parser.Token;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 微信登录验证
 * @author yzt
 * @time 2024-12-17-17:07
 */
@RestController
@RequestMapping("/wxAuth")
public class WXController {
    @Resource
    private WXService wxService;

    @Resource
    private UserService userService;
    @PostMapping("/wxLogin")
    public Result wxLogin(@RequestBody User user){
        Map<String, String> wxData = wxService.getWxData(user.getWxTempCode());
        String openid = wxData.get("openid");
        String sessionKey = wxData.get("session_key");
        User dbWxUser = userService.getWxUser(openid);
        if(ObjectUtil.isNull(dbWxUser)){
           // 创建一个User
           dbWxUser = user;
           // 存储openid 和 sessionkey
           dbWxUser.setOpenId(openid);
           dbWxUser.setSessionKey(sessionKey);
           dbWxUser.setCreateTime(DateUtil.format(DateUtil.date(), DatePattern.NORM_DATETIME_FORMAT));
           dbWxUser.setCreateBy("微信一键登录注册");
           userService.add(dbWxUser);
        }
        // 返回给前端token
        dbWxUser.setToken( TokenUtil.createToken( dbWxUser ) ); // 解析后可知道调用的用户信息
        dbWxUser = userService.clearWxPrivate(dbWxUser);
        return Result.success(dbWxUser);
    }

    @GetMapping("/test")
    public Result test() {
        return Result.success();
    }
}
