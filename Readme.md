<h1 align="center">
  <!-- <img src="./web/public/logo.svg" alt="Live777" width="200"> -->
  <br>ShareApp<br>
</h1>

# 需求模块
打造一个用于分享拼单的小程序 , App有不同类型分区 即 相同类型的拼单信息在对应的分区中；
暂时具备：娱乐分区（约时间一起游戏、例如拼剧本杀、密室逃脱、游乐园等），学习分区（寻找学习搭子）
用户可以编辑发布 拼单信息 分为 已有分区信息 和 未设分区信息 两种 


## cms
用户信息发布，查看模块
## 登录模块
微信小程序实现一键登录

## 分区展示模块
依照各个分区 特点 设置发布分区的内容游戏内容等


## 聊天室模块
拼单成功后，可以进行私聊 小群公聊沟通

### 消息列表

```sql 
# 查询当前用户的消息列表信息 包括群聊和私聊
select * from tk_talk_list
where (from_id = #{user_id} AND talk_type = 2) or (from_id = #{user_id} AND talk_type = 1) or(to_id = #{user_id} AND talk_type =1)
order by update_time desc;
```



### 私聊
```sql 用户之间的私聊信息
# 私聊
# 从私聊信息建立联系
# 从 `tk_message_private` 中查找到当前用户1 与 用户2 的
# 所有 发送和收到的消息
SELECT * 
FROM tk_message_private 
WHERE (from_id = 1 AND to_id = 2) OR (from_id = 2 AND to_id = 1)
ORDER BY create_time;
```

```sql 
# 消息列表
# 查找用户 1 的消息列表连接信息 
# 注意talk_type | 1 私聊 | 2公聊 , 限制个数
# 根据时间倒序
select *
from tk_talk_list
where from_id = 1 AND talk_type = 1
ORDER BY  create_time DESC
LIMIT 100
;
```



``` sql 用户1 与用户2 之间互相发信息
# 插入一条私聊信息
# 同时更新
INSERT INTO tk_message_private 
(from_id,to_id,content,create_time,from_nickname,from_user_profile,)
VALUES
(1  , 2, '我测试一下消息发送时间哈' ,'2024-12-19 17:53:11','小熊bb', '/images/xxbb.jpg');

```
### 群聊
```sql 接受群聊消息 
# 查询我的群聊 id √
# 查询群聊消息 按照时间排序倒叙 限制 100 条

# 此时查到我的群聊  
# 按照群聊update_time 降序
(select to_id as group_id, name from tk_talk_list 
where talk_type = 2 AND from_id = 1;
order by update_time DESC;
) -》 获取到 to_id as group_id
# 查询群聊信息 包括 是否禁用 群聊昵称等 √
select * from tk_group
where tk_group.group_id  = #{group_id}

# 查询群聊信息 √
  select * from tk_message_public
  where tk_message_public.group_id = group_id
  order by  create_time DESC
  LIMIT 1000;
```


```sql 群聊发送消息
# 向群聊发送消息
INSERT INTO tk_message_public
 (group_id,from_id,create_time,content,from_nickname,from_user_profile,parent_message_id)
VALUES
(1,1,'2024-12-19 19:06:11','欢迎加入重庆游群聊!','小熊bb','/images/xxbb.jpg',null);
```


## 身份证验证、手机号记录
验证用户信息确保实名

## 博客发布


## GNN推荐算法

## 分区模块



