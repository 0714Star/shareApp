package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkMessageType;
import com.jxufe_yzt.java.mapper.TkMessageTypeMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 消息类型业务处理
 **/
@Service
public class TkMessageTypeService {

    @Resource
    private TkMessageTypeMapper tkMessageTypeMapper;

    /**
     * 新增
     */
    public void add(TkMessageType tkMessageType) {
        tkMessageTypeMapper.insert(tkMessageType);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkMessageTypeMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkMessageTypeMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkMessageType tkMessageType) {
        tkMessageTypeMapper.updateByPrimaryKey(tkMessageType);
    }

    /**
     * 根据ID查询
     */
    public TkMessageType selectById(Integer id) {
        return tkMessageTypeMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkMessageType> selectAll(TkMessageType tkMessageType) {
        return tkMessageTypeMapper.selectByExample(tkMessageType);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkMessageType> selectPage(TkMessageType tkMessageType, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkMessageType> list = tkMessageTypeMapper.selectByExample(tkMessageType);
        return PageInfo.of(list);
    }

}