package com.jxufe_yzt.java.utils.generate;

class TableColumn {
    /**
     * sql数据类型
     */
    private String javaType;
    /**
     * 字段原始名称
     */
    private String name;
    /**
     * 字段注释
     */
    private String comment;

    public String getJavaType() {
        return javaType;
    }

    public void setJavaType(String javaType) {
        this.javaType = javaType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
