package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkGroup;
import com.jxufe_yzt.java.mapper.TkGroupMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 群聊表业务处理
 **/
@Service
public class TkGroupService {

    @Resource
    private TkGroupMapper tkGroupMapper;

    /**
     * 获取群聊信息
     * @param id
     * @return
     */
    public TkGroup selectGroupData(Integer id) {
        return tkGroupMapper.selectGroupData(id);
    }

    /**
     * 新增
     */
    public void add(TkGroup tkGroup) {
        tkGroupMapper.insert(tkGroup);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkGroupMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkGroupMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkGroup tkGroup) {
        tkGroupMapper.updateByPrimaryKey(tkGroup);
    }

    /**
     * 根据ID查询
     */
    public TkGroup selectById(Integer id) {
        return tkGroupMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkGroup> selectAll(TkGroup tkGroup) {
        return tkGroupMapper.selectByExample(tkGroup);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkGroup> selectPage(TkGroup tkGroup, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkGroup> list = tkGroupMapper.selectByExample(tkGroup);
        return PageInfo.of(list);
    }

}