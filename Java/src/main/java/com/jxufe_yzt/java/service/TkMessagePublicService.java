package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkMessagePublic;
import com.jxufe_yzt.java.mapper.TkMessagePublicMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 群聊公聊信息表业务处理
 **/
@Service
public class TkMessagePublicService {

    @Resource
    private TkMessagePublicMapper tkMessagePublicMapper;

    /**
     * 查询群聊聊天记录
     * @param groupId
     * @return
     */
    public List<TkMessagePublic> selectPublicMessage(Integer groupId){
        return tkMessagePublicMapper.selectGroupData(groupId);
    }

    /**
     * 新增
     */
    public void add(TkMessagePublic tkMessagePublic) {
        tkMessagePublicMapper.insert(tkMessagePublic);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkMessagePublicMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkMessagePublicMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkMessagePublic tkMessagePublic) {
        tkMessagePublicMapper.updateByPrimaryKey(tkMessagePublic);
    }

    /**
     * 根据ID查询
     */
    public TkMessagePublic selectById(Integer id) {
        return tkMessagePublicMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkMessagePublic> selectAll(TkMessagePublic tkMessagePublic) {
        return tkMessagePublicMapper.selectByExample(tkMessagePublic);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkMessagePublic> selectPage(TkMessagePublic tkMessagePublic, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkMessagePublic> list = tkMessagePublicMapper.selectByExample(tkMessagePublic);
        return PageInfo.of(list);
    }

}