package com.jxufe_yzt.java.entity;

import lombok.Data;
import tk.mybatis.mapper.annotation.KeySql;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;

@Data
@Table(name = "user_test")
public class UserTest implements Serializable {
    private static final long serialVersionUID = 1L; // 可序列化

    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Integer id;

    // 会自动 驼峰转 _ 将  数据库中的 abc_def 与 Java实体的 abcDef 对应
    @Column(name = "username") // 字段名称 在数据库中为 username 的
    private String username;
    // 不写Column 默认 会自动转驼峰
    private String password;

    private Integer age;

    private Date birthday;

    private String sex;

    private String note;

    // 仅供java使用不关联数据库
    @Transient // import javax.persistence.Transient;
    private String SessionKey;

//    @Override
//    public String toString() {
//        return "UserTest{" +
//                "id=" + id +
//                ", username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", age=" + age +
//                ", birthday=" + birthday +
//                ", sex='" + sex + '\'' +
//                ", note='" + note + '\'' +
//                ", SessionKey='" + SessionKey + '\'' +
//                '}';
//    }
}
