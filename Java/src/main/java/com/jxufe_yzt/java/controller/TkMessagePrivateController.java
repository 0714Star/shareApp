package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.TkMessagePrivate;
import com.jxufe_yzt.java.service.TkMessagePrivateService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.List;

/**
 * 私聊消息表前端操作接口
 **/
@RestController
@RequestMapping("/tkMessagePrivate")
public class TkMessagePrivateController {

    @Resource
    private TkMessagePrivateService tkMessagePrivateService;


    /**
     * 新增
     */
    @PostMapping("/add")
    public Result add(@RequestBody TkMessagePrivate tkMessagePrivate) {
        tkMessagePrivateService.add(tkMessagePrivate);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id) {
        tkMessagePrivateService.deleteByPrimaryKey(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        tkMessagePrivateService.deleteBatch(ids);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result updateById(@RequestBody TkMessagePrivate tkMessagePrivate) {
        tkMessagePrivateService.updateById(tkMessagePrivate);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id) {
        TkMessagePrivate tkMessagePrivate = tkMessagePrivateService.selectById(id);
        return Result.success(tkMessagePrivate);
    }

    /**
     * 查询所有
     */
    @GetMapping("/selectAll")
    public Result selectAll(TkMessagePrivate tkMessagePrivate) {
        List<TkMessagePrivate> list = tkMessagePrivateService.selectAll(tkMessagePrivate);
        return Result.success(list);
    }

    /**
     * 分页查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(TkMessagePrivate tkMessagePrivate,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<TkMessagePrivate> page = tkMessagePrivateService.selectPage(tkMessagePrivate, pageNum, pageSize);
        return Result.success(page);
    }

}