package com.jxufe_yzt.java.service;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import com.jxufe_yzt.java.entity.User;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

/**
 * @author yzt
 * @time 2024-12-18-10:29
 */
@SpringBootTest
public class WXServiceTest {
    @Resource
    private WXService wxService;
    @Resource
    private UserService userService;
    @Test
    public void test() {
//        Map<String, String> stringStringMap = wxService.getWxData("0b35fLll29qgJe4ZuBn12ZBl2k45fLIV");
        // User dbUser = userService.getWxUser("abc");
        String format = DateUtil.format(DateUtil.date(), DatePattern.NORM_DATETIME_FORMAT);
        System.out.println(format);
        return;
    }
}
