package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkMessagePrivate;
import com.jxufe_yzt.java.mapper.TkMessagePrivateMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 私聊消息表业务处理
 **/
@Service
public class TkMessagePrivateService {

    @Resource
    private TkMessagePrivateMapper tkMessagePrivateMapper;

    /**
     * 新增
     */
    public void add(TkMessagePrivate tkMessagePrivate) {
        tkMessagePrivateMapper.insert(tkMessagePrivate);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkMessagePrivateMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkMessagePrivateMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkMessagePrivate tkMessagePrivate) {
        tkMessagePrivateMapper.updateByPrimaryKey(tkMessagePrivate);
    }

    /**
     * 根据ID查询
     */
    public TkMessagePrivate selectById(Integer id) {
        return tkMessagePrivateMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkMessagePrivate> selectAll(TkMessagePrivate tkMessagePrivate) {
        return tkMessagePrivateMapper.selectByExample(tkMessagePrivate);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkMessagePrivate> selectPage(TkMessagePrivate tkMessagePrivate, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkMessagePrivate> list = tkMessagePrivateMapper.selectByExample(tkMessagePrivate);
        return PageInfo.of(list);
    }

}