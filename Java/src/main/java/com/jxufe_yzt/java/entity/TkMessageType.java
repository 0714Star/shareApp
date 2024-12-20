package com.jxufe_yzt.java.entity;

import tk.mybatis.mapper.annotation.KeySql;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 消息类型
*/
@Table (name = "tk_message_type")
public class TkMessageType implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 消息类型 */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Boolean messageTypeId;
    /** 消息名称 */
    private String name;

    public Boolean getMessageTypeId() {
        return messageTypeId;
    }

    public void setMessageTypeId(Boolean messageTypeId) {
        this.messageTypeId = messageTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}