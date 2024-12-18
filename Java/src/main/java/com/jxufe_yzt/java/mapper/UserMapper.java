package com.jxufe_yzt.java.mapper;

import com.jxufe_yzt.java.entity.Message;
import com.jxufe_yzt.java.entity.User;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * @author yzt
 * @time 2024-12-17-15:27
 */
public interface UserMapper extends Mapper<User> {
    /**
     * 查询所有用户消息
     * @param userId
     * @return
     */
    @Transactional
    @Select("SELECT * FROM message_private WHERE from_id = #{userId};")
    List<Message> getUserMessages(Integer userId);

    @Transactional
    @Select("SELECT * FROM sys_user WHERE open_id = #{open_id};")
    User getWxUser(String open_id);
}
