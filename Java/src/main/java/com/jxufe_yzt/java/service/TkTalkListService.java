package com.jxufe_yzt.java.service;

import com.jxufe_yzt.java.entity.TkTalkList;
import com.jxufe_yzt.java.mapper.TkTalkListMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 用户间消息链接表：
你与哪些人 or 群聊有过联系
业务处理
 **/
@Service
public class TkTalkListService {

    @Resource
    private TkTalkListMapper tkTalkListMapper;

    /**
     * 查询我的群聊 信息
     * @param id
     * @return
     */
    public List<TkTalkList> getMyTalkGroupList(int id) {
        return tkTalkListMapper.selectMyGroupList(id);
    }
    /**
     * 新增
     */
    public void add(TkTalkList tkTalkList) {
        tkTalkListMapper.insert(tkTalkList);
    }

    /**
     * 删除
     */
    public void deleteByPrimaryKey(Integer id) {
        tkTalkListMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            tkTalkListMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(TkTalkList tkTalkList) {
        tkTalkListMapper.updateByPrimaryKey(tkTalkList);
    }

    /**
     * 根据ID查询
     */
    public TkTalkList selectById(Integer id) {
        return tkTalkListMapper.selectByPrimaryKey(id);
    }

    /**
     * 查询所有
     */
    public List<TkTalkList> selectAll(TkTalkList tkTalkList) {
        return tkTalkListMapper.selectByExample(tkTalkList);
    }

    /**
     * 分页查询
     */
    public PageInfo<TkTalkList> selectPage(TkTalkList tkTalkList, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<TkTalkList> list = tkTalkListMapper.selectByExample(tkTalkList);
        return PageInfo.of(list);
    }

}