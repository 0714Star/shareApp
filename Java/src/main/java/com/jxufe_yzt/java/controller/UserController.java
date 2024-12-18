package com.jxufe_yzt.java.controller;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.ObjectUtil;
import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * 用户
 * @author yzt
 * @time 2024-12-17-19:19
 */
@RestController
@RequestMapping("/users")
public class UserController {
    @Resource
    private UserService userService;
    @Value("${app.default.avatar}")
    private String defaultAvatar;

    @PostMapping("/add")
    private Result add(@RequestBody User user) {
        User dbUser = userService.selectById(user.getUserId());
        if(ObjectUtil.isEmpty(dbUser)) {
            user.setCreateBy(DateUtil.format(DateUtil.date(), DatePattern.NORM_DATE_FORMAT));
            if(user.getAvatar() != null) {
                user.setAvatar(defaultAvatar);
            }
            if(user.getCreateBy() != null) {
                user.setCreateBy("user");
            }
            userService.add(user);

        }
        return Result.success();
    }
}
