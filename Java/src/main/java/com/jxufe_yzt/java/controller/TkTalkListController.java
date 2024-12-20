package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.TkTalkList;
import com.jxufe_yzt.java.service.TkTalkListService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.List;

/**
 * 用户间消息链接表：
你与哪些人 or 群聊有过联系
前端操作接口
 **/
@RestController
@RequestMapping("/tkTalkList")
public class TkTalkListController {

    @Resource
    private TkTalkListService tkTalkListService;

    /**
     * 新增
     */
    @PostMapping("/add")
    public Result add(@RequestBody TkTalkList tkTalkList) {
        tkTalkListService.add(tkTalkList);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id) {
        tkTalkListService.deleteByPrimaryKey(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        tkTalkListService.deleteBatch(ids);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result updateById(@RequestBody TkTalkList tkTalkList) {
        tkTalkListService.updateById(tkTalkList);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id) {
        TkTalkList tkTalkList = tkTalkListService.selectById(id);
        return Result.success(tkTalkList);
    }

    /**
     * 查询所有
     */
    @GetMapping("/selectAll")
    public Result selectAll(TkTalkList tkTalkList) {
        List<TkTalkList> list = tkTalkListService.selectAll(tkTalkList);
        return Result.success(list);
    }

    /**
     * 分页查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(TkTalkList tkTalkList,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<TkTalkList> page = tkTalkListService.selectPage(tkTalkList, pageNum, pageSize);
        return Result.success(page);
    }

}