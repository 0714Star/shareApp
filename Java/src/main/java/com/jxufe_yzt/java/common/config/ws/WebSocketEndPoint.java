//package com.jxufe_yzt.java.common.config.ws;
//
//import jakarta.websocket.OnClose;
//import jakarta.websocket.OnMessage;
//import jakarta.websocket.OnOpen;
//import jakarta.websocket.Session;
//import jakarta.websocket.server.PathParam;
//import jakarta.websocket.server.ServerEndpoint;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
///**
// * @author yzt
// * @time 2024-12-14-14:03
// */
//@ServerEndpoint("/ws")
//@Component
//public class WebSocketEndPoint {
//
//    private Session session;
//
//    /**
//     * 连接成功调用
//     * @param session
//     * @param userId
//     */
//    @OnOpen
//    public void onOpen(Session session, @PathParam("userId") String userId) {
//        // 将会话存入 到连接池中
//        SessionPool.sessions.put(userId, session);
//    }
//    @OnClose
//    public void onClose(Session session) throws IOException {
//        // 系统自动
//        SessionPool.close(session.getId());
//        session.close();
//    }
//
//    @OnMessage
//    public void onMessage(String message, Session session) {
//        SessionPool.sendMessage(message);
//    }
//}
