package com.jxufe_yzt.java.mapper;

import com.jxufe_yzt.java.entity.TkGroup;
import java.util.List;

import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

/**
 * 操作tk_group相关数据接口
 */
public interface TkGroupMapper extends Mapper<TkGroup> {
    /**
     * 查询群聊信息
     * @return
     */
    @Select("select * from tk_group where tk_group.group_id  = #{group_id}")
    TkGroup selectGroupData(Integer group_id);
}
