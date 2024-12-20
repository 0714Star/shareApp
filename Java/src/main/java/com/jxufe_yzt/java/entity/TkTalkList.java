package com.jxufe_yzt.java.entity;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Transient;

import tk.mybatis.mapper.annotation.KeySql;
import java.util.Date;

/**
 * 用户间消息链接表：
你与哪些人 or 群聊有过联系

*/
@Table (name = "tk_talk_list")
public class TkTalkList implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 发信息者 | 群聊者ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long fromId;
    /** 收信息者 | 群聊ID  */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long toId;
    /** 群聊或用户名称 */
    private String name;
    /** 群聊 |  消息创建者 */
    private String createBy;
    /** 创建时间 */
    private Date createTime;
    /** 对话框类型  私聊1 | 群聊2 */
    private Integer talkType;
    /** 最新更新时间 */
    private Date updateTime;
    /** 发信人信息 */
    @Transient
    private User from_user;
    /** 收信人信息 */
    @Transient
    private User to_user;
    /** 群聊信息 */
    @Transient
    private TkGroup from_group;

/// //////////////////////////////////////
    public Long getFromId() {
        return fromId;
    }

    public User getFrom_user() {
        return from_user;
    }

    public void setFrom_user(User from_user) {
        this.from_user = from_user;
    }

    public User getTo_user() {
        return to_user;
    }

    public void setTo_user(User to_user) {
        this.to_user = to_user;
    }

    public TkGroup getFrom_group() {
        return from_group;
    }

    public void setFrom_group(TkGroup from_group) {
        this.from_group = from_group;
    }

    public void setFromId(Long fromId) {
        this.fromId = fromId;
    }

    public Long getToId() {
        return toId;
    }

    public void setToId(Long toId) {
        this.toId = toId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getTalkType() {
        return talkType;
    }

    public void setTalkType(Integer talkType) {
        this.talkType = talkType;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

}