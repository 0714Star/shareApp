package com.jxufe_yzt.java.entity;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import tk.mybatis.mapper.annotation.KeySql;
import java.util.Date;

/**
 * 群聊表
*/
@Table (name = "tk_group")
public class TkGroup implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 群聊ID */
    @Id
    @KeySql(useGeneratedKeys = true) // 主键回填 : 更新后返回给java
    private Long groupId;
    /** 群聊名称 */
    private String groupName;
    /** 群聊创建时间 */
    private Date createTime;
    /** 群聊创建者 */
    private String createBy;
    /** 群聊状态 | 空 或 0 正常| 1 封禁 */
    private Boolean groupState;

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Boolean getGroupState() {
        return groupState;
    }

    public void setGroupState(Boolean groupState) {
        this.groupState = groupState;
    }

}