package com.jxufe_yzt.java.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jxufe_yzt.java.entity.UserTest;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class UserTestServiceTest {

    @Resource
    private UserTestService userTestService;
    @Test
    void getUserTestMapper() throws JsonProcessingException {
        UserTest user = userTestService.getUserTestMapper(2);
        System.out.println(new ObjectMapper().writeValueAsString(user));;
    }

    @Test
    void saveUserTest() {
    }
}