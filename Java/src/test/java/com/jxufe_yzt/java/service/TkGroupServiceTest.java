package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkGroup;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TkGroupServiceTest {
    @Resource
    private TkGroupService tkGroupService;
    @Test
    void selectById() {
        TkGroup tkGroup = tkGroupService.selectById(1);
        return;
    }

}