package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.UserTest;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserTestServiceTest {

    @Resource
    private UserTestService userTestService;
    @Test
    void getUserTestMapper() {
        UserTest user = userTestService.getUserTestMapper(1);
        System.out.println(user);
    }

    @Test
    void saveUserTest() {
    }
}