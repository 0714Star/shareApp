"use strict";
const validator = {
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "defaultValue": {
      "$env": "uid"
    },
    "label": "作者"
  },
  "category_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "分类",
    "label": "分类"
  },
  "content": {
    "rules": [
      {
        "required": true
      }
    ],
    "label": "文章内容",
    "title": "文章内容"
  },
  "excerpt": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "摘要",
    "title": "文章摘录"
  },
  "article_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      }
    ],
    "title": "文章状态",
    "defaultValue": 0,
    "label": "文章状态"
  },
  "view_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "阅读数量",
    "label": "阅读数量"
  },
  "is_sticky": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否置顶",
    "label": "是否置顶"
  },
  "is_essence": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "阅读加精",
    "label": "阅读加精"
  },
  "comment_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "关闭"
          },
          {
            "value": 1,
            "text": "开放"
          }
        ]
      }
    ],
    "title": "开放评论",
    "label": "开放评论"
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "发表时间"
  }
};
const enumConverter = {
  "article_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  },
  "comment_status_valuetotext": {
    "0": "关闭",
    "1": "开放"
  }
};
function filterToWhere(filter, command) {
  let where = {};
  for (let field in filter) {
    let { type, value } = filter[field];
    switch (type) {
      case "search":
        if (typeof value === "string" && value.length) {
          where[field] = new RegExp(value);
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = [];
          for (let s of value) {
            selectValue.push(command.eq(s));
          }
          where[field] = command.or(selectValue);
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0];
          let lt = value[1];
          where[field] = command.and([command.gte(gt), command.lte(lt)]);
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value;
          let startDate = new Date(s);
          let endDate = new Date(e);
          where[field] = command.and([command.gte(startDate), command.lte(endDate)]);
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value;
          where[field] = command.and([command.gte(startDate), command.lte(endDate)]);
        }
        break;
    }
  }
  return where;
}
exports.enumConverter = enumConverter;
exports.filterToWhere = filterToWhere;
exports.validator = validator;
