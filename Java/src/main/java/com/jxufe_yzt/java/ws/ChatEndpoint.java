package com.jxufe_yzt.java.ws;

import jakarta.annotation.PostConstruct;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

/**
 * @author yzt
 * @time 2024-12-14-07:43
 */
@ServerEndpoint("/chat")
@Component
public class ChatEndpoint {
    /**
     * 建立连接调用
     * @param session
     * @param config
     */
    @OnOpen
    public void onOpen(Session session , EndpointConfig config) {
        System.out.println("成功建立连接");
    }

    /**
     * 收到客户端发送的数据
     * @param message
     * @param session
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("成功收到消息");
        session.getAsyncRemote().sendText(message);
    }

    /**
     * 连接关闭后
     * @param session
     */
    @OnClose
    public void onClose(Session session) {
        System.out.println("连接关闭");

    }
}
