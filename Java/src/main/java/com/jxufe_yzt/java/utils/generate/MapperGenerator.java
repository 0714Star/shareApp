package com.jxufe_yzt.java.utils.generate;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;

import java.util.List;
import java.util.stream.Collectors;

import static com.jxufe_yzt.java.utils.generate.CodeGenerator.*;

/**
 * 自动生成Mapper和 Mapper.xml
 */
public class MapperGenerator {

    /**
     * 生成Mapper相关的所有文件
     *
     * @param tableName 表名
     */
    public static void generate(String tableName) {
        // 生成Mapper.java
        generateMapper(tableName);
        // 生成Mapper.xml
//        generateMapperXml(tableName);
    }

    /**
     * 生成 Mapper.Xml
     * @param tableName
     */
    public static void generate_Xml(String tableName) {
        generateMapperXml(tableName);
    }
    /**
     * 生成Mapper.xml
     *
     * @param tableName 表名
     */
    private static void generateMapperXml(String tableName) {
        String entityClassName = getEntityClassName(tableName);
        Table table = getTableColumns(tableName);
        StringBuilder builder = StrUtil.builder().append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<!DOCTYPE mapper\n" +
                "        PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\n" +
                "        \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n" +
                "<mapper namespace=\""+baseRootName+".mapper." + entityClassName + "Mapper\">\n\n");
        List<TableColumn> tableColumns = table.getTableColumns();
        String sqlFields = tableColumns.stream().map(TableColumn::getName).collect(Collectors.joining(","));
        builder.append(getSpace(4)).append("<sql id=\"Base_Column_List\">\n").append(getSpace(8))
                .append(sqlFields).append("\n").append(getSpace(4)).append("</sql>\n\n");

        // 查询
        builder.append("    <select id=\"selectAll\" resultType=\""+baseRootName+".entity." + entityClassName + "\">\n" +
                "        select\n" +
                "        <include refid=\"Base_Column_List\" />\n" +
                "        from " + tableName + "\n" +
                "        <where>\n");
        tableColumns.forEach(tableColumn -> {
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            if ("String".equals(tableColumn.getJavaType())) {
                builder.append("            <if test=\"" + camelName + " != null\"> and " + tableColumn.getName()
                        + " like concat('%', #{" + camelName + "}, '%')</if>\n");

            } else {
                builder.append("            <if test=\"" + camelName + " != null\"> and " + tableColumn.getName()
                        + " = #{" + camelName + "}</if>\n");
            }
        });
        builder.append("        </where>\n");
        builder.append("        order by id desc\n");
        builder.append("    </select>\n\n");

        builder.append("    <select id=\"selectById\" resultType=\""+baseRootName+".entity." + entityClassName + "\">\n" +
                "        select\n" +
                "        <include refid=\"Base_Column_List\" />\n" +
                "        from " + tableName + "\n" +
                "        where id = #{id}\n" +
                "    </select>\n\n");

        // 删除
        builder.append("    <delete id=\"deleteById\">\n" +
                "        delete from " + tableName + "\n" +
                "        where  id = #{id}\n" +
                "    </delete>\n\n");

        // 新增
        builder.append("    <insert id=\"insert\" parameterType=\""+baseRootName+".entity." + entityClassName + "\" useGeneratedKeys=\"true\">\n" +
                "        insert into " + tableName + "\n" +
                "        <trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\">\n");
        tableColumns.forEach(tableColumn -> {
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            builder.append("            <if test=\"").append(camelName).append(" != null\">").append(tableColumn.getName()).append(",</if>\n");
        });
        builder.append("        </trim>\n")
                .append("        <trim prefix=\"values (\" suffix=\")\" suffixOverrides=\",\">\n");
        tableColumns.forEach(tableColumn -> {
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            builder.append("            <if test=\"").append(camelName).append(" != null\">").append("#{").append(camelName).append("},</if>\n");
        });
        builder.append("        </trim>\n");
        builder.append("    </insert>\n\n");

        // 修改
        builder.append("    <update id=\"updateById\" parameterType=\""+baseRootName+".entity." + entityClassName + "\">\n" +
                "        update " + tableName + "\n" +
                "        <set>\n");
        tableColumns.forEach(tableColumn -> {
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            if (!"id".equalsIgnoreCase(tableColumn.getName())) {
                builder.append("            <if test=\"" + camelName + " != null\">\n" +
                        "                " + tableColumn.getName() + " = #{" + camelName + "},\n" +
                        "            </if>\n");
            }
        });
        builder.append("        </set>\n" +
                "        where id = #{id} \n" +
                "    </update>\n\n");

        builder.append("</mapper>");
        // 把字符串写出到文件
        FileUtil.writeString(builder.toString(), resourcesFilePath + "/mapper/" + entityClassName + "Mapper.xml", "UTF-8");
        System.out.println(entityClassName + "Mapper.xml 生成成功");
    }

    /**
     * 生成Mapper
     *
     * @param tableName 表名
     */
    private static void generateMapper(String tableName) {
        String entityClassName = getEntityClassName(tableName);
        String entityName = getEntityName(tableName);
        StringBuilder builder = StrUtil.builder()
                .append("package ").append(basePackageName).append(".mapper;").append("\n\n");
        // 生成导包
        builder.append("import "+baseRootName+".entity.").append(entityClassName).append(";\n");
        builder.append("import java.util.List;\n\n");
        builder.append("import tk.mybatis.mapper.common.Mapper;\n\n");

        // 生成注释
        builder.append("/**\n").append(" * ").append("操作").append(tableName).append("相关数据接口").append("\n").append("*/\n");
        // 生成class
        builder.append("public interface ").append(entityClassName).append("Mapper").append(" extends ").append("Mapper<").append(entityClassName).append("> {\n\n");

        // 生成方法
//        builder.append(getSpace(4)).append("/**\n").append(getSpace(5)).append(" * ").append("新增").append("\n").append(getSpace(4)).append("*/\n");
//        builder.append(getSpace(4)).append("int insert(").append(entityClassName).append(" ").append(entityName).append(");\n\n");
//
//        builder.append(getSpace(4)).append("/**\n").append(getSpace(5)).append(" * ").append("删除").append("\n").append(getSpace(4)).append("*/\n");
//        builder.append(getSpace(4)).append("int deleteById(").append("Integer id").append(");\n\n");
//
//        builder.append(getSpace(4)).append("/**\n").append(getSpace(5)).append(" * ").append("修改").append("\n").append(getSpace(4)).append("*/\n");
//        builder.append(getSpace(4)).append("int updateById(").append(entityClassName).append(" ").append(entityName).append(");\n\n");
//
//        builder.append(getSpace(4)).append("/**\n").append(getSpace(5)).append(" * ").append("根据ID查询").append("\n").append(getSpace(4)).append("*/\n");
//        builder.append(getSpace(4)).append(entityClassName).append(" selectById(").append("Integer id").append(");\n\n");
//
//        builder.append(getSpace(4)).append("/**\n").append(getSpace(5)).append(" * ").append("查询所有").append("\n").append(getSpace(4)).append("*/\n");
//        builder.append(getSpace(4)).append("List<").append(entityClassName).append(">").append(" selectAll(").append(entityClassName).append(" ").append(entityName).append(");\n\n");
//
        builder.append("}");
        // 把字符串写出到文件
        FileUtil.writeString(builder.toString(), javaFilePath + packageToPath() + "/mapper/" + entityClassName + "Mapper.java", "UTF-8");
        System.out.println(entityClassName + "Mapper.java 生成成功");
    }
}
