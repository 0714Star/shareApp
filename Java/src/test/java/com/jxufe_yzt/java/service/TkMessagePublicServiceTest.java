package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkMessagePublic;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TkMessagePublicServiceTest {
    @Resource
    private TkMessagePublicService tkMessagePublicService;

    @Test
    void selectPublicMessage() {
        List<TkMessagePublic> tkMessagePublics = tkMessagePublicService.selectPublicMessage(1);
        return;
    }
}