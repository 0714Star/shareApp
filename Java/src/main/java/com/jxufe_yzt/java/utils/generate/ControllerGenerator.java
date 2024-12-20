package com.jxufe_yzt.java.utils.generate;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;

import static com.jxufe_yzt.java.utils.generate.CodeGenerator.*;


/**
 * Controller代码生成器
 */
public class ControllerGenerator {

    /**
     * 生成Controller
     * @param tableName 表名
     */
    public static void generate(String tableName)  {
        Table table = getTableColumns(tableName);
        String entityClassName = getEntityClassName(tableName);
        String entityName = getEntityName(tableName);
        String serviceClassName = entityClassName + "Service";
        String serviceName = entityName + "Service";

        StringBuilder builder = StrUtil.builder()
                .append("package ").append(basePackageName).append(".controller;").append("\n\n");

        // 生成导包
        builder.append("import "+baseRootName+".common.Result;\n");
        builder.append("import "+baseRootName+".entity.").append(entityClassName).append(";\n");
        builder.append("import "+baseRootName+".service.").append(serviceClassName).append(";\n");
        builder.append("import com.github.pagehelper.PageInfo;\n");
        builder.append("import org.springframework.web.bind.annotation.*;\n");
        builder.append("import jakarta.annotation.Resource;\n");
        builder.append("import java.util.List;\n\n");


        // 生成Class
        builder.append("/**\n").append(" * ").append(table.getTableComment()).append("前端操作接口\n").append(" **/\n");
        builder.append("@RestController\n");
        builder.append("@RequestMapping(\"/").append(entityName).append("\")\n");
        builder.append("public class ").append(entityClassName).append("Controller {\n\n");

        builder.append(getSpace(4)).append("@Resource\n");
        builder.append(getSpace(4)).append("private ").append(serviceClassName).append(" ").append(serviceName).append(";\n\n");

        // 生成方法
        builder.append(getComment("新增"));
        builder.append(getSpace(4)).append("@PostMapping(\"/add\")\n");
        builder.append(getSpace(4)).append("public Result add(@RequestBody ").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append(serviceName).append(".add(").append(entityName).append(");\n");
        builder.append(getSpace(8)).append("return Result.success();\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("删除"));
        builder.append(getSpace(4)).append("@DeleteMapping(\"/delete/{id}\")\n");
        builder.append(getSpace(4)).append("public Result deleteById(@PathVariable Integer id) {\n");
        builder.append(getSpace(8)).append(serviceName).append(".deleteByPrimaryKey(id);\n");
        builder.append(getSpace(8)).append("return Result.success();\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("批量删除"));
        builder.append(getSpace(4)).append("@DeleteMapping(\"/delete/batch\")\n");
        builder.append(getSpace(4)).append("public Result deleteBatch(@RequestBody List<Integer> ids) {\n");
        builder.append(getSpace(8)).append(serviceName).append(".deleteBatch(ids);\n");
        builder.append(getSpace(8)).append("return Result.success();\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("修改"));
        builder.append(getSpace(4)).append("@PutMapping(\"/update\")\n");
        builder.append(getSpace(4)).append("public Result updateById(@RequestBody ").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append(serviceName).append(".updateById(").append(entityName).append(");\n");
        builder.append(getSpace(8)).append("return Result.success();\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("根据ID查询"));
        builder.append(getSpace(4)).append("@GetMapping(\"/selectById/{id}\")\n");
        builder.append(getSpace(4)).append("public Result selectById(@PathVariable Integer id) {\n");
        builder.append(getSpace(8)).append(entityClassName).append(" ").append(entityName).append(" = ").append(serviceName).append(".selectById(id);\n");
        builder.append(getSpace(8)).append("return Result.success(").append(entityName).append(");\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("查询所有"));
        builder.append(getSpace(4)).append("@GetMapping(\"/selectAll\")\n");
        builder.append(getSpace(4)).append("public Result selectAll(").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append("List<").append(entityClassName).append("> list = ").append(serviceName).append(".selectAll(").append(entityName).append(");\n");
        builder.append(getSpace(8)).append("return Result.success(list);\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("分页查询"));
        builder.append(getSpace(4)).append("@GetMapping(\"/selectPage\")\n");
        builder.append(getSpace(4)).append("public Result selectPage(").append(entityClassName).append(" ").append(entityName)
                .append(",\n                             @RequestParam(defaultValue = \"1\") Integer pageNum,\n")
                .append("                             @RequestParam(defaultValue = \"10\") Integer pageSize) {\n");
        builder.append(getSpace(8)).append("PageInfo<").append(entityClassName).append("> page = ").append(serviceName)
                .append(".selectPage(").append(entityName).append(", pageNum, pageSize);\n");
        builder.append(getSpace(8)).append("return Result.success(page);\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append("}");

        // 把字符串写出到文件
        FileUtil.writeString(builder.toString(), javaFilePath + packageToPath() + "/controller/" + entityClassName + "Controller.java", "UTF-8");
        System.out.println(entityClassName + "Controller.java 生成成功");

    }
}
