package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkMessagePrivate;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TkMessagePrivateServiceTest {
    @Resource
    private TkMessagePrivateService tkMessagePrivateService;
    @Test
    void add() {
        TkMessagePrivate tkMessagePrivate = new TkMessagePrivate();

        tkMessagePrivateService.add(tkMessagePrivate);
    }
}