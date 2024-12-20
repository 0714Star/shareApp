package com.jxufe_yzt.java.entity;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import tk.mybatis.mapper.annotation.KeySql;
import java.util.Date;

/**
 * 群聊公聊信息表
*/
@Table (name = "tk_message_public")
public class TkMessagePublic implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 消息ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long messageId;
    /** 群聊ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long groupId;
    /** 发消息ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long fromId;
    /** 发送时间 */
    private Date createTime;
    /** 消息内容 */
    private String content;
    /** 发送者昵称 */
    private String fromNickname;
    /** 发送者用户头像 */
    private String fromUserProfile;
    /** 引用的消息ID */
    private Long parentMessageId;

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getFromId() {
        return fromId;
    }

    public void setFromId(Long fromId) {
        this.fromId = fromId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFromNickname() {
        return fromNickname;
    }

    public void setFromNickname(String fromNickname) {
        this.fromNickname = fromNickname;
    }

    public String getFromUserProfile() {
        return fromUserProfile;
    }

    public void setFromUserProfile(String fromUserProfile) {
        this.fromUserProfile = fromUserProfile;
    }

    public Long getParentMessageId() {
        return parentMessageId;
    }

    public void setParentMessageId(Long parentMessageId) {
        this.parentMessageId = parentMessageId;
    }

}