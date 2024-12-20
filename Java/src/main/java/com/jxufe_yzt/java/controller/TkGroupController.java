package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.TkGroup;
import com.jxufe_yzt.java.service.TkGroupService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.List;

/**
 * 群聊表前端操作接口
 **/
@RestController
@RequestMapping("/tkGroup")
public class TkGroupController {

    @Resource
    private TkGroupService tkGroupService;

    /**
     * 新增
     */
    @PostMapping("/add")
    public Result add(@RequestBody TkGroup tkGroup) {
        tkGroupService.add(tkGroup);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id) {
        tkGroupService.deleteByPrimaryKey(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        tkGroupService.deleteBatch(ids);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result updateById(@RequestBody TkGroup tkGroup) {
        tkGroupService.updateById(tkGroup);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id) {
        TkGroup tkGroup = tkGroupService.selectById(id);
        return Result.success(tkGroup);
    }

    /**
     * 查询所有
     */
    @GetMapping("/selectAll")
    public Result selectAll(TkGroup tkGroup) {
        List<TkGroup> list = tkGroupService.selectAll(tkGroup);
        return Result.success(list);
    }

    /**
     * 分页查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(TkGroup tkGroup,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<TkGroup> page = tkGroupService.selectPage(tkGroup, pageNum, pageSize);
        return Result.success(page);
    }

}