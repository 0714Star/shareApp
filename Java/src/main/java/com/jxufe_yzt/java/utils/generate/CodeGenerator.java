package com.jxufe_yzt.java.utils.generate;


import cn.hutool.core.util.StrUtil;
import cn.hutool.db.Db;
import cn.hutool.db.ds.simple.SimpleDataSource;

import javax.sql.DataSource;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 代码生成器
 * 选哟指定数据库的表信息
 */
public class CodeGenerator {
    protected static final String url = "jdbc:mysql://localhost:3306/xidian_project_xhy?nullCatalogMeansCurrent=true&useInformationSchema=true";
    protected static final String username = "root";
    protected static final String password = "xidian";

    protected static final String projectFilePath = System.getProperty("user.dir");
    protected static final String springbootFilePath = projectFilePath + "/Java/src/main";
    protected static final String javaFilePath = springbootFilePath + "/java";
    protected static final String resourcesFilePath = springbootFilePath + "/resources";
    protected static final String vueFilePath = projectFilePath + "/vue/src/views/manager/ShopManager";
    protected static final String basePackageName = "com.jxufe_yzt.java";
    protected static final String baseRootName = "com.jxufe_yzt.java";

    /**
     * 主类  生成代码
     */
    public static void main(String[] args) {
        String tableName = "tk_talk_list";
        // 生成Entity
//        EntityGenerator.generate(tableName);
        // 生成Mapper #
//        MapperGenerator.generate(tableName);
        // 生成XML
        MapperGenerator.generate_Xml(tableName);
        // 生成Service #
//        ServiceGenerator.generate(tableName);
        // 生成Controller #
//        ControllerGenerator.generate(tableName);
        // 生成Vue
//        VueGenerator.generate(tableName);
        // 测试修改
//        getTableColumns(tableName);
    }




    /**
     * 获取table和字段属性
     *
     * @param tableName 表名称
     */
    public static Table getTableColumns(String tableName) {
        Table table = new Table();
        try {
            DataSource ds = new SimpleDataSource(url, username, password);
            DatabaseMetaData metaData = Db.use(ds).getConnection().getMetaData();
            ResultSet tables = metaData.getTables(null, null, tableName, null);
            while (tables.next()) {
                // 获得表名
//              String dbTableName = tables.getString("TABLE_NAME");
                table.setTableName(tableName);

                // 获取主键信息
                Set<String> primaryKeys = new HashSet<>();
                ResultSet pkResultSet = metaData.getPrimaryKeys(null, null, tableName);
                while (pkResultSet.next()) {
                    String primaryKeyColumn = pkResultSet.getString("COLUMN_NAME");
                    primaryKeys.add(primaryKeyColumn);
                }
                table.setPrimaryKeys(primaryKeys);
                // 获取表注释
                String tableRemarks = tables.getString("REMARKS");
                table.setTableComment(tableRemarks);
                // 通过表名获得所有字段名
                ResultSet columns = metaData.getColumns(null, null, tableName, "%");
                List<TableColumn> tableColumns = new ArrayList<>();
                table.setTableColumns(tableColumns);
                // 获得所有字段名
                while (columns.next()) {
                    TableColumn tableColumn = new TableColumn();
                    tableColumns.add(tableColumn);
                    // 获得字段名
                    String columnName = columns.getString("COLUMN_NAME");
                    tableColumn.setName(columnName);
                    // 获得字段类型
                    String typeName = columns.getString("TYPE_NAME");
                    tableColumn.setJavaType(convertType(typeName));
                    // 获得字段注释
                    String remarks = columns.getString("REMARKS");
                    tableColumn.setComment(remarks);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return table;
    }

    /**
     * 获取类名称（首字母大写）
     *
     * @param tableName 表名
     * @return 实体类名称（首字母大写）
     */
    public static String getEntityClassName(String tableName) {
        return StrUtil.upperFirst(getEntityName(tableName));
    }

    /**
     * 通过表名获取实体类名称（首字母小写）
     *
     * @param tableName 表名称
     * @return 实体类名称（小写）
     */
    public static String getEntityName(String tableName) {
        tableName = tableName.replace("sys_", "").replace("t_", "");
        return StrUtil.toCamelCase(tableName);
    }

    /**
     * 数据库字段类型转换成Java数据类型
     *
     * @param dbType 数据库字段类型
     * @return java字段类型
     */
    public static String convertType(String dbType) {
        switch (dbType) {
            case "INT":
                return "Integer";
            case "DOUBLE":
                return "Double";
            case "BIGINT":
                return "Long";
            case "VARCHAR":
            case "TEXT":
            case "LONGTEXT":
                return "String";
            case "DATETIME":
            case "TIMESTAMP":
                return "Date";
            case "DECIMAL":
                return "BigDecimal";
            case "TINYINT":
                return "Boolean";
        }
        throw new RuntimeException("数据库表包含了不支持的数据类型：" + dbType);
    }

    /**
     * 获取空格
     *
     * @param num 个数
     */
    public static String getSpace(int num) {
        StringBuilder space = new StringBuilder();
        for (int i = 0; i < num; i++) {
            space.append(" ");
        }
        return space.toString();
    }

    /**
     * 包名转换成文件路径
     *
     * @return 文件路径
     */
    public static String packageToPath() {
        return "/" + basePackageName.replaceAll("\\.", "/");
    }

    /**
     * 生成类或方法注释
     */
    public static String getComment(String comment) {
        return StrUtil.builder(getSpace(4)).append("/**\n")
                .append(getSpace(4)).append(" * ").append(comment).append("\n")
                .append(getSpace(4)).append(" */\n").toString();
    }

}
