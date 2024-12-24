package com.jxufe_yzt.java.ws;

import com.jxufe_yzt.java.entity.TkMessagePrivate;
import com.jxufe_yzt.java.entity.TkMessagePublic;
import com.jxufe_yzt.java.entity.User;
import com.jxufe_yzt.java.service.TkMessagePrivateService;
import com.jxufe_yzt.java.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * @author yzt
 * @time 2024-12-17-14:30
 */
@RestController
public class WSController {
    @Resource
    SimpMessagingTemplate simpMessagingTemplate;
    @Resource
    UserService userService;
    @Resource
    TkMessagePrivateService tkMessagePrivateService;
    /**
     * 私聊消息转发
     * @param privateMessage
     */
    @MessageMapping("/privateMessage")
    public void handlePrivateMessage(@Payload TkMessagePrivate privateMessage) {
        Long userId = privateMessage.getFromId();
        User user = userService.selectById(userId);
        privateMessage.setFromNickname(user.getNickName());
        privateMessage.setCreateTime(new Date());
        privateMessage.setFromUserProfile(user.getAvatar());
        // 插入到数据库中
        // tkMessagePrivateService.add(privateMessage);
//      simpMessagingTemplate.convertAndSendToUser(privateMessage.getToId().toString(),"/queue/chat",privateMessage);
        simpMessagingTemplate.convertAndSend("/private/all/"+privateMessage.getToId(), privateMessage);
        return;
    }

    /**
     * 发送群聊消息
     * @param publicMessage
     */
    @MessageMapping("/publicMessage")
    public void handlePublicMessage(@RequestBody TkMessagePublic publicMessage) {
        Long userId = publicMessage.getFromId();
        User user = userService.selectById(userId);
        publicMessage.setFromNickname(user.getNickName());
        publicMessage.setCreateTime(new Date());
        publicMessage.setFromUserProfile(user.getAvatar());
        // 插入到数据库中

//      simpMessagingTemplate.convertAndSendToUser(privateMessage.getToId().toString(),"/queue/chat",privateMessage);
        simpMessagingTemplate.convertAndSend("/private/all"+publicMessage.getGroupId(), publicMessage);

    }



}
