package com.jxufe_yzt.java.common.config.ws;

import jakarta.websocket.Session;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Session 连接池 ， 存储用户 Session
 * @author yzt
 * @time 2024-12-14-14:01
 */
public class SessionPool {
    // key: sessionId , value : Session(会话) 连接
    public static Map<String, Session> sessions = new ConcurrentHashMap<String, Session>();

    public static void close(String SessionId){
        for(String userId : SessionPool.sessions.keySet()){
            Session session = SessionPool.sessions.get(userId);
            if(session.getId().equals(SessionId)){
                sessions.remove(SessionId);
                break;
            }
        }
    }
    /**
     * 群发
     * @param message
     */
    public static void sendMessage(String message) {
        for(String sessionId : SessionPool.sessions.keySet()){
            SessionPool.sessions.get(sessionId).getAsyncRemote().sendText(message);
        }
    }

    /**
     * 单发
     * @param message
     * @param session
     */
    public static void sendMessageSession(String message, Session session) {

    }


}
