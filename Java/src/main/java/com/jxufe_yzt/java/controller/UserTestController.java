package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.entity.UserTest;
import com.jxufe_yzt.java.service.UserTestService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userTest")
public class UserTestController {

    @Resource
    private UserTestService userTestService;

    @GetMapping("/{id}")
//    @ResponseBody
    public UserTest getUserId(@PathVariable Integer id) {
        UserTest userTest = userTestService.getUserTestMapper(id);
        System.out.println(userTest);

        return userTest;
    }
}
