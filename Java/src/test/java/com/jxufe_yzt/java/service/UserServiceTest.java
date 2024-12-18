package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.Message;
import com.jxufe_yzt.java.mapper.UserMapper;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @author yzt
 * @time 2024-12-17-15:37
 */
@SpringBootTest
public class UserServiceTest {
    @Resource
    private UserService userService;
    @Test
    public void test() {
        List<Message> userMessages = userService.getUserMessages(1);
        System.out.println(userMessages);
    }
}
