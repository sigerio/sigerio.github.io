# 自动超链接与README增强方案

## 状态
- 类型：proposal
- 日期：2024

## 目标
1. 为正文中的裸URL自动创建可点击超链接
2. README.md 增加网站访问链接
3. README.md 增加图片使用说明

## 约束
- ❌ 禁止改动 `_posts/` 文件夹内的内容

---

## 改进内容

### 1. 正文URL自动超链接

**文件**：`assets/js/main.js`

**功能说明**：
- 自动识别正文中的 `http://` 和 `https://` 开头的URL
- 转换为可点击的 `<a>` 标签
- 新窗口打开（`target="_blank"`）
- 添加安全属性（`rel="noopener noreferrer"`）

**排除范围**：
- 已有 `<a>` 标签内的链接
- `<code>` 和 `<pre>` 代码块内的URL
- 已是链接文本的URL

**实现逻辑**：
```javascript
// 匹配URL的正则
var urlPattern = /(https?:\/\/[^\s<>\[\]()，。！？]+)/g;

// 遍历.post-content下的文本节点
// 替换匹配的URL为<a>标签
```

---

### 2. README.md 增加访问链接

**位置**：文件开头，标题之后

**新增内容**：
```markdown
## 在线访问

🔗 **博客地址**：[https://sigerio.github.io](https://sigerio.github.io)

---
```

---

### 3. README.md 增加图片使用说明

**位置**：在"如何增加文章"章节之后，新增第4节

**新增内容**：
```markdown
### 4. 如何添加图片

**步骤：**
1. 将图片放入 `assets/images/` 目录（如目录不存在请创建）
2. 在文章中使用 Markdown 语法引用

**语法：**

| 类型 | 语法 |
|------|------|
| 基础图片 | `![描述](/assets/images/文件名.png)` |
| 带标题 | `![描述](/assets/images/文件名.png "标题")` |
| 指定宽度 | `<img src="/assets/images/文件名.png" width="500">` |

**示例：**

```markdown
![网络拓扑图](/assets/images/network-topology.png)
```

**建议：**
- 文件名使用英文或拼音，避免中文和空格
- 推荐格式：PNG（截图/图表）、JPG（照片）、GIF（动图）
- 大图建议压缩后上传，加快页面加载
```

---

## 涉及文件

| 文件 | 改动类型 | 改动量 |
|------|----------|--------|
| `assets/js/main.js` | 新增函数 | ~40行 |
| `README.md` | 新增章节 | ~35行 |

## 完成
- [x] 已实现
��确认后开始实现
