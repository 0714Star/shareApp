package com.jxufe_yzt.java.mapper;

import com.jxufe_yzt.java.entity.TkMessagePrivate;
import com.jxufe_yzt.java.entity.TkMessagePublic;
import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.common.Mapper;

/**
 * 操作tk_message_public相关数据接口
*/
public interface TkMessagePublicMapper extends Mapper<TkMessagePublic> {

    /**
     * 根据群聊 Id 查询群聊信息
     * @param groupId
     * @return
     */
    @Transactional
    @Select("select * from tk_message_public where tk_message_public.group_id = #{groupId}  order by  create_time DESC  LIMIT 1000;")
    List<TkMessagePublic> selectGroupData(Integer groupId);
}