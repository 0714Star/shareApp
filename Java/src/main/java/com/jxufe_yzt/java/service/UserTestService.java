package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.UserTest;
import com.jxufe_yzt.java.mapper.UserTestMapper;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserTestService {

    @Resource
    private UserTestMapper userTestMapper;

    // 根据 id 查询 用户
    public UserTest getUserTestMapper(Integer id) {

        return userTestMapper.selectByPrimaryKey(id);
    }
    // 事务 出现异常 可 自动回滚
    @Transactional
    public void saveUserTest(UserTest userTest) {
        userTestMapper.insert(userTest);
    }
}
