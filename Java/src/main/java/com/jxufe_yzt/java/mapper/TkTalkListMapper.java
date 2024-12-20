package com.jxufe_yzt.java.mapper;

import com.jxufe_yzt.java.entity.TkTalkList;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

/**
 * 操作tk_talk_list相关数据接口
*/
public interface TkTalkListMapper extends Mapper<TkTalkList> {

    /**
     * 查询我的群聊 , 私聊 && 我加入的
     * 按照最新消息时间降序
     * @return
     */
    @Select("select to_id as group_id, name from tk_talk_list  where talk_type = 2 AND from_id = #{userId}" +
            " order by update_time desc;")
    List<TkTalkList> selectMyGroupList(Integer userId);

    /**
     * 查询用户的消息列表
     * @param userId
     * @return
     */
    List<TkTalkList> selectMyList(@Param("userId") Integer userId);
}
