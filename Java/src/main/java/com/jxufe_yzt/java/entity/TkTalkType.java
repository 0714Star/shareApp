package com.jxufe_yzt.java.entity;

import tk.mybatis.mapper.annotation.KeySql;

import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * 聊天框类型：公聊、私聊等
*/
//@Data
@Table(name = "tk_talk_type")
public class TkTalkType implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 聊天框类型 */
    @Id
    @KeySql(useGeneratedKeys = true)
    private Boolean talkTypeId;
    /** 聊天框总称呼 */
    private String name;
/// /////////
    public Boolean getTalkTypeId() {
        return talkTypeId;
    }

    public void setTalkTypeId(Boolean talkTypeId) {
        this.talkTypeId = talkTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}