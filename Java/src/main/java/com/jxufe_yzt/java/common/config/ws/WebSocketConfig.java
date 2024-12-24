package com.jxufe_yzt.java.common.config.ws;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Stomp、SockJs 的 WebSocket
 * @author yzt
 * @time 2024-12-14-07:46
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /**
     * 注册站点
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/endpoint") // 前端访问路径
                .setAllowedOriginPatterns("*") // 允许所有跨域
                ;  // 启用 SockJS 回退.withSockJS()
    }

    /**
     * 注册拦截路径信息 公聊 和 私聊 信息
     * @param config
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 这句话表示在topic和user这两个域上可以向客户端发消息。
        config.enableSimpleBroker("/topic", "/user");  // 群聊、私聊路径
        // 这句话表示客户向服务器端发送时的主题上面需要加"/app"作为前缀。
        config.setApplicationDestinationPrefixes("/app");
        // 这句话表示给指定用户发送一对一的主题前缀是"/user"。
        config.setUserDestinationPrefix("/user");
    }
}

