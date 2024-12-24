package com.jxufe_yzt.java.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 解决跨域问题, 配置 tomcat
 * @author yzt
 * @time 2024-12-13-15:48
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("*");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
// // 该方法 java 17 & openjdk 21 行不通
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 匹配所有路径
                .allowedOriginPatterns("*") // 支持所有域
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 支持的方法
                .allowedMethods("*")
                .allowedHeaders("*") // 支持的请求头
                .allowCredentials(false)
        ; // 是否允许发送 Cookie
    }

}
