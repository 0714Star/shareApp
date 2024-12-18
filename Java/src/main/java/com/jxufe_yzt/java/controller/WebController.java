package com.jxufe_yzt.java.controller;

import cn.hutool.core.util.ObjectUtil;
import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 基础请求
 * @author yzt
 * @time 2024-12-17-17:46
 */
@RestController
public class WebController {
    @Resource
    UserService userService;

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        // 空用户
//        if(ObjectUtil.isEmpty());
        // 验证权限

        // 管理员登录

        // 用户登录
        return Result.success();
    }
}
