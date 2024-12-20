package com.jxufe_yzt.java.utils.generate;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

/**
 * 代码生成-数据库表
 */
public class Table {
    /**
     * 表名称
     */
    private String tableName;
    /**
     * 表注释
     */
    private String tableComment;
    /**
     * 表字段
     */
    private List<TableColumn> tableColumns;
    /**
     * 表主键
     */
    private Set<String> primaryKeys;

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableComment() {
        return tableComment;
    }

    public void setTableComment(String tableComment) {
        this.tableComment = tableComment;
    }

    public List<TableColumn> getTableColumns() {
        return tableColumns;
    }

    public void setTableColumns(List<TableColumn> tableColumns) {
        this.tableColumns = tableColumns;
    }

    public Set<String> getPrimaryKeys() {
        return primaryKeys;
    }

    public void setPrimaryKeys(Set<String> primaryKeys) {
        this.primaryKeys = primaryKeys;
    }
}
