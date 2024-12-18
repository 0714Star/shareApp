package com.jxufe_yzt.java.ws;

//import com.jxufe_yzt.java.entity.Message;
//import com.jxufe_yzt.java.entity.User;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Controller;
//
//import java.util.Date;

/**
 * @author yzt
 * @time 2024-12-17-14:30
 */
//@Controller
//public class WSController {
//
//    SimpMessagingTemplate simpMessagingTemplate;
//    /**
//     * 单聊的消息的接受与转发
//     * @param authentication
//     * @param message
//     */
//    @MessageMapping("/ws/chat")
//    public void handleMessage(Authentication authentication, Message message){
//        User user= ((User) authentication.getPrincipal());
////        message.setFromNickname(user);
////        message.set(user.getNickname());
////        message.setFrom(user.getUsername());
////        message.setCreateTime(new Date());
////        simpMessagingTemplate.convertAndSendToUser(message.getTo(),"/queue/chat",message);
//    }
//}
