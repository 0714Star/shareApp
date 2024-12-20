package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.TkMessagePublic;
import com.jxufe_yzt.java.service.TkMessagePublicService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.List;

/**
 * 群聊公聊信息表前端操作接口
 **/
@RestController
@RequestMapping("/tkMessagePublic")
public class TkMessagePublicController {

    @Resource
    private TkMessagePublicService tkMessagePublicService;

    /**
     * 新增
     */
    @PostMapping("/add")
    public Result add(@RequestBody TkMessagePublic tkMessagePublic) {
        tkMessagePublicService.add(tkMessagePublic);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id) {
        tkMessagePublicService.deleteByPrimaryKey(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        tkMessagePublicService.deleteBatch(ids);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result updateById(@RequestBody TkMessagePublic tkMessagePublic) {
        tkMessagePublicService.updateById(tkMessagePublic);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id) {
        TkMessagePublic tkMessagePublic = tkMessagePublicService.selectById(id);
        return Result.success(tkMessagePublic);
    }

    /**
     * 查询所有
     */
    @GetMapping("/selectAll")
    public Result selectAll(TkMessagePublic tkMessagePublic) {
        List<TkMessagePublic> list = tkMessagePublicService.selectAll(tkMessagePublic);
        return Result.success(list);
    }

    /**
     * 分页查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(TkMessagePublic tkMessagePublic,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<TkMessagePublic> page = tkMessagePublicService.selectPage(tkMessagePublic, pageNum, pageSize);
        return Result.success(page);
    }

}