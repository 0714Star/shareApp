package com.jxufe_yzt.java.service;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import com.jxufe_yzt.java.entity.Message;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.exception.CustomException;
import com.jxufe_yzt.java.mapper.UserMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author yzt
 * @time 2024-12-17-15:40
 */
@Service
public class UserService {

    @Resource
    private UserMapper userMapper;

    /**
     * 获取用户所有信息
     * @param userId
     * @return
     */
    public List<Message> getUserMessages(Integer userId) {
        return userMapper.getUserMessages(userId);
    }

    // 用户登录 TODO
    public boolean userRegister(User user) {
        if (user == null) {
//            throw new CustomException();
        }

        return true;
    }

    /**
     * 清除微信隐私属性
     * @param user
     * @return
     */
    public User clearWxPrivate(User user){
         user.setSessionKey(null);
         return user;
    }
    public User getWxUser(String openId) {
        return userMapper.getWxUser(openId);
    }
    public void add(User user) {
        userMapper.insert(user);
    }

    public void delete (User user) {
        userMapper.delete(user);
    }
    public void delete(Integer userId) {
        userMapper.deleteByPrimaryKey(userId);
    }
    public void update(User user) {
        userMapper.updateByPrimaryKeySelective(user);
    }
    public User selectById(Integer userId) {
        return userMapper.selectByPrimaryKey(userId);
    }
}
