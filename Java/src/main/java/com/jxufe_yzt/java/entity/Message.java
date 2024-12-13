package com.jxufe_yzt.java.entity;

import lombok.Data;

import java.util.Date;

/**
 * 通讯消息
 * @author yzt
 * @time 2024-12-14-07:30
 */
@Data
public class Message {
    // 消息发起者
    private String from;
    // 消息接收者
    private String to;
    // 消息内容
    private String content;
    // 消息创建时间
    private Date createTime;
    // 消息来源昵称
    private String fromNickname;
    // 消息用户头像
    private String fromUserProfile;
    // 消息类型ID
    private Integer messageTypeId;

}