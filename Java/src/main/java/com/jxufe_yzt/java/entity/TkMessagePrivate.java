package com.jxufe_yzt.java.entity;

import tk.mybatis.mapper.annotation.KeySql;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 私聊消息表
*/
@Table (name = "tk_message_private")
public class TkMessagePrivate implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 消息ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long messageId;
    /** 发送者ID */
    @Id
    private Long fromId;
    /** 接收者ID */
    @Id
    private Long toId;
    /** 消息类型ID */
    private Integer messageTypeId;
    /** 消息内容 */
    private String content;
    /** 创建时间 */
    private Date createTime;
    /** 发送者昵称 */
    private String fromNickname;
    /** 发送者用户头像 */
    private String fromUserProfile;

    public Integer getMessageTypeId() {
        return messageTypeId;
    }

    public void setMessageTypeId(Integer messageTypeId) {
        this.messageTypeId = messageTypeId;
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getFromId() {
        return fromId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

}