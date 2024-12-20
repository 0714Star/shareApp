package com.jxufe_yzt.java.controller;

import com.jxufe_yzt.java.common.Result;
import com.jxufe_yzt.java.entity.TkMessageType;
import com.jxufe_yzt.java.service.TkMessageTypeService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.List;

/**
 * 消息类型前端操作接口
 **/
@RestController
@RequestMapping("/tkMessageType")
public class TkMessageTypeController {

    @Resource
    private TkMessageTypeService tkMessageTypeService;

    /**
     * 新增
     */
    @PostMapping("/add")
    public Result add(@RequestBody TkMessageType tkMessageType) {
        tkMessageTypeService.add(tkMessageType);
        return Result.success();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id) {
        tkMessageTypeService.deleteByPrimaryKey(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        tkMessageTypeService.deleteBatch(ids);
        return Result.success();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result updateById(@RequestBody TkMessageType tkMessageType) {
        tkMessageTypeService.updateById(tkMessageType);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id) {
        TkMessageType tkMessageType = tkMessageTypeService.selectById(id);
        return Result.success(tkMessageType);
    }

    /**
     * 查询所有
     */
    @GetMapping("/selectAll")
    public Result selectAll(TkMessageType tkMessageType) {
        List<TkMessageType> list = tkMessageTypeService.selectAll(tkMessageType);
        return Result.success(list);
    }

    /**
     * 分页查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(TkMessageType tkMessageType,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<TkMessageType> page = tkMessageTypeService.selectPage(tkMessageType, pageNum, pageSize);
        return Result.success(page);
    }

}