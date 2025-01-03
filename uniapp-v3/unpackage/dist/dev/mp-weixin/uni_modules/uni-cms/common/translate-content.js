"use strict";
function replaceBlockBlot(blotName, imagePlaceholder, attributes = {}) {
  attributes = {
    ...attributes,
    type: blotName
    // 将 type 属性设置为 blotName
  };
  return {
    // insert 属性是一个对象，包含一个 image 属性，值为 imagePlaceholder
    insert: {
      image: imagePlaceholder
    },
    // attributes 属性是一个对象，包含一个 data-custom 属性，值为 attributes 对象的键值对组成的字符串
    attributes: {
      "data-custom": Object.keys(attributes).map((key) => `${key}=${attributes[key]}`).join("&")
    }
  };
}
function splitMarkdownLink(str) {
  let isLinkReg = /\[[^\[\]\(\)]*?]\([^\[\]\(\)]*\)/g;
  let match = str.match(isLinkReg);
  let result = [];
  if (!match) {
    result.push({
      type: "text",
      value: str
    });
    return result;
  }
  for (let i = 0; i < match.length; i++) {
    const link = match[i];
    const [m, text, href] = link.match(/\[(.*)]\((.*)\)/);
    const strIndexOf = str.indexOf(link);
    if (i === 0 && strIndexOf > 0) {
      result.push({
        type: "text",
        value: str.substring(0, strIndexOf)
      });
    }
    result.push({
      type: "link",
      value: text,
      href
    });
    const nextLink = match[i + 1];
    if (!nextLink)
      continue;
    const nextLinkIndexOf = str.indexOf(nextLink);
    const nextTextStartOf = strIndexOf + link.length;
    result.push({
      type: "text",
      value: str.substring(nextTextStartOf, nextLinkIndexOf)
    });
  }
  return result;
}
function translateInputContent(delta) {
  let newDelta = [];
  for (const item of delta.ops) {
    if (item.attributes && item.attributes.background) {
      item.attributes.backgroundColor = item.attributes.background;
    }
    if (typeof item.insert === "string") {
      if (item.attributes && item.attributes.link) {
        newDelta.push({
          ...item,
          insert: `[${item.insert}](${item.attributes.link})`
        });
      } else {
        newDelta.push(item);
      }
      continue;
    }
    if (item.insert.unlockContent) {
      newDelta.push(
        replaceBlockBlot(
          "unlockContent",
          "data:image/png;base64,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",
          {}
        )
      );
      continue;
    }
    if (item.insert.mediaVideo) {
      newDelta.push(
        replaceBlockBlot(
          "mediaVideo",
          "data:image/png;base64,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",
          item.attributes || {}
        )
      );
      continue;
    }
    newDelta.push(item);
  }
  return {
    ops: newDelta
  };
}
function translateOutputContent(delta) {
  var _a;
  let newDelta = [];
  for (const item of delta.ops) {
    if (typeof item.insert === "string") {
      const splitText = splitMarkdownLink(item.insert);
      if (item.attributes && item.attributes.backgroundColor) {
        item.attributes.background = item.attributes.backgroundColor;
      }
      for (const textItem of splitText) {
        switch (textItem.type) {
          default:
          case "text":
            newDelta.push({
              attributes: item.attributes || {},
              insert: textItem.value
            });
            break;
          case "link":
            newDelta.push({
              attributes: {
                ...item.attributes || {},
                link: textItem.href
              },
              insert: textItem.value
            });
            break;
        }
      }
      continue;
    }
    if (item.insert.image) {
      const customData = (((_a = item == null ? void 0 : item.attributes) == null ? void 0 : _a["data-custom"]) ?? "").split("&").reduce((res, item2) => {
        const [key, value] = item2.split("=");
        res[key] = value;
        return res;
      }, {});
      const { type, ...attributes } = customData;
      if (customData.type === "unlockContent") {
        newDelta.push({
          insert: {
            unlockContent: true
          }
        });
      } else if (customData.type === "mediaVideo") {
        newDelta.push({
          insert: {
            mediaVideo: true
          },
          attributes
        });
      } else {
        newDelta.push(item);
      }
    } else {
      newDelta.push(item);
    }
  }
  return {
    ops: newDelta
  };
}
exports.translateInputContent = translateInputContent;
exports.translateOutputContent = translateOutputContent;
