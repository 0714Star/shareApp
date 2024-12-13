package com.jxufe_yzt.java;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.Set;

@SpringBootTest // 标识是springboot的测试环境
public class RedisTest {

    @Resource
    private RedisTemplate redisTemplate;
    @Test
    public void test() {
        // string 字符串操作
        redisTemplate.boundValueOps("str 域").set("abc"); //
        Object str_域 = redisTemplate.opsForValue().get("str 域");
        System.out.println(str_域);
        // hash
        redisTemplate.boundHashOps("hash 域").put(1,"123");
            // 获取 hash 对应域 下的 key | value
        Set hash_域_key = redisTemplate.boundHashOps("hash 域").keys();
        List hash_域_values = redisTemplate.boundHashOps("hash 域").values();
        System.out.println(hash_域_key);
        System.out.println(hash_域_values);
        // list
        redisTemplate.boundListOps("list 域").leftPush("abc");
        redisTemplate.boundListOps("list 域").leftPush(hash_域_values);
        Object first = redisTemplate.opsForList().getFirst("list 域");
        System.out.println(first);
        // set 无序集合
        redisTemplate.boundSetOps("set 域").add("a");
        redisTemplate.boundSetOps("set 域").add("b");
        redisTemplate.boundSetOps("set 域").add("c");
        Set set_域 = redisTemplate.boundSetOps("set 域").members();
        System.out.println(set_域);
        // sorted set 有序集合 ， 需要手动设置 优先级
        redisTemplate.boundZSetOps("zset 域").add("a", 1); // value 和 权重
        redisTemplate.boundZSetOps("zset 域").add("b", 1); // value 和 权重
        redisTemplate.boundZSetOps("zset 域").add("c", 1); // value 和 权重
        Set zset_域 = redisTemplate.boundZSetOps("zset 域").range(0, -1);
        System.out.println(zset_域);
    }
}
