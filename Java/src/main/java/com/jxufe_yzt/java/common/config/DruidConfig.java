package com.jxufe_yzt.java.common.config;

import com.alibaba.druid.pool.DruidDataSource;
//import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.jxufe_yzt.java.common.config.Properties.DruidProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * 功能： Druid数据库连接池配置，依赖于DruidProperties获取配置文件的信息
 *
 * @author 叶子彤
 * @time 2024-12-15 12:25
 * @Description
 */
@Configuration
public class DruidConfig { // druid数据源

    @Bean
    @ConfigurationProperties("spring.datasource.druid.master") // 主数据源配置
    public DataSource masterDataSource(DruidProperties druidProperties){
        DruidDataSource dataSource = new DruidDataSource();
//        DruidDataSource dataSource =DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }

    @Bean
    @ConfigurationProperties("spring.datasource.druid.slave")// 从数据源配置
    @ConditionalOnProperty(prefix = "spring.datasource.druid.slave", name = "enabled", havingValue = "true")//当 enabled 的值为true启用注入这个Bean
    public DataSource slaveDataSource(DruidProperties druidProperties)
    {
        DruidDataSource dataSource = new DruidDataSource();

//        DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }
}