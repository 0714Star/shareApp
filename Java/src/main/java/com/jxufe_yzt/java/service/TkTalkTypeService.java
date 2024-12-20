package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkTalkType;
import com.jxufe_yzt.java.mapper.TkTalkTypeMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 聊天框类型：公聊、私聊等业务处理
 **/
@Service
public class TkTalkTypeService {

    @Resource
    private TkTalkTypeMapper tkTalkTypeMapper;

    /**
     * 新增
     */
    public void add(TkTalkType tkTalkType) {
        tkTalkTypeMapper.insert(tkTalkType);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkTalkTypeMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkTalkTypeMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkTalkType tkTalkType) {
        tkTalkTypeMapper.updateByPrimaryKey(tkTalkType);
    }

    /**
     * 根据ID查询
     */
    public TkTalkType selectById(Integer id) {
        return tkTalkTypeMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkTalkType> selectAll(TkTalkType tkTalkType) {
        return tkTalkTypeMapper.selectByExample(tkTalkType);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkTalkType> selectPage(TkTalkType tkTalkType, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkTalkType> list = tkTalkTypeMapper.selectByExample(tkTalkType);
        return PageInfo.of(list);
    }

}