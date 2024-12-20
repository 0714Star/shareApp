package com.jxufe_yzt.java.utils.generate;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;

import static com.jxufe_yzt.java.utils.generate.CodeGenerator.*;

public class ServiceGenerator {

    public static void generate(String tableName) {
        Table table = getTableColumns(tableName);
        String entityClassName = getEntityClassName(tableName);
        String entityName = getEntityName(tableName);
        String mapperClassName = entityClassName + "Mapper";
        String mapperName = entityName + "Mapper";
        StringBuilder builder = StrUtil.builder()
                .append("package ").append(basePackageName).append(".service;").append("\n\n");

        // 生成导包
        builder.append("import "+baseRootName+".entity.").append(entityClassName).append(";\n");
        builder.append("import "+baseRootName+".mapper.").append(mapperClassName).append(";\n");
        builder.append("import com.github.pagehelper.PageHelper;\n");
        builder.append("import com.github.pagehelper.PageInfo;\n");
        builder.append("import jakarta.annotation.Resource;\n");
        builder.append("import org.springframework.stereotype.Service;\n");
        builder.append("import java.util.List;\n\n");

        // 生成Class
        builder.append("/**\n").append(" * ").append(table.getTableComment()).append("业务处理\n").append(" **/\n");
        builder.append("@Service\n");
        builder.append("public class ").append(entityClassName).append("Service {\n\n");

        builder.append(getSpace(4)).append("@Resource\n").append(getSpace(4)).append("private ")
                .append(mapperClassName).append(" ").append(mapperName).append(";\n\n");

        // 生成方法
        builder.append(getComment("新增"));
        builder.append(getSpace(4)).append("public void add(").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append(mapperName).append(".insert(").append(entityName).append(");\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("删除"));
        builder.append(getSpace(4)).append("public void deleteByPrimaryKey(Integer id) {\n");
        builder.append(getSpace(8)).append(mapperName).append(".deleteByPrimaryKey(id);\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("批量删除"));
        builder.append(getSpace(4)).append("public void deleteBatch(List<Integer> ids) {\n");
        builder.append(getSpace(8)).append("for (Integer id : ids) {\n");
        builder.append(getSpace(12)).append(mapperName).append(".deleteByPrimaryKey(id);\n");
        builder.append(getSpace(8)).append("}\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("修改"));
        builder.append(getSpace(4)).append("public void updateById(").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append(mapperName).append(".updateByPrimaryKey(").append(entityName).append(");\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("根据ID查询"));
        builder.append(getSpace(4)).append("public ").append(entityClassName).append(" selectById(Integer id) {\n");
        builder.append(getSpace(8)).append("return ").append(mapperName).append(".selectByPrimaryKey(id);\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("查询所有"));
        builder.append(getSpace(4)).append("public ").append("List<").append(entityClassName).append("> selectAll(").append(entityClassName).append(" ").append(entityName).append(") {\n");
        builder.append(getSpace(8)).append("return ").append(mapperName).append(".selectByExample(").append(entityName).append(");\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append(getComment("分页查询"));
        builder.append(getSpace(4)).append("public ").append("PageInfo<").append(entityClassName).append("> selectPage(").append(entityClassName).append(" ").append(entityName).append(", Integer pageNum, Integer pageSize) {\n");
        builder.append(getSpace(8)).append("PageHelper.startPage(pageNum, pageSize);\n");
        builder.append(getSpace(8)).append("List<").append(entityClassName).append("> list = ").append(mapperName).append(".selectByExample(").append(entityName).append(");\n");
        builder.append(getSpace(8)).append("return PageInfo.of(list);\n");
        builder.append(getSpace(4)).append("}\n\n");

        builder.append("}");

        // 把字符串写出到文件
        FileUtil.writeString(builder.toString(), javaFilePath + packageToPath() + "/service/" + entityClassName + "Service.java", "UTF-8");
        System.out.println(entityClassName + "Service.java 生成成功");
    }
}
