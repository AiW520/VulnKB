# Vue 3 + Vite

# 🛡️ VulnKB - 代码漏洞知识库
> 系统化收录常见代码安全漏洞与修复方案的前端知识库，覆盖 OWASP Top 10 全部类别，为开发者提供一站式安全学习参考。

---

## 📌 项目简介
VulnKB 是一个面向开发者的代码安全漏洞知识库，旨在帮助开发者快速了解、识别和修复常见的代码安全漏洞。

### ✨ 核心功能
- 覆盖 **OWASP Top 10** 全部漏洞类别，收录 40+ 典型漏洞条目
- 每个漏洞包含：漏洞描述、根本原因、安全影响、预防措施和代码对比示例
- 按漏洞风险等级（严重/高危/中危/低危）和类型分类，便于快速定位
- 支持漏洞名称、CWE编号、漏洞描述的全文检索
- 响应式深色主题界面，适配桌面与移动设备

---

## 🛠️ 技术栈
| 技术 | 用途 |
|------|------|
| Vue 3 | 前端框架 |
| Vite | 构建工具 |
| Vue Router | 路由管理 |
| SCSS | 样式开发 |
| JavaScript | 业务逻辑 |

---

## 📂 项目结构
```bash
CODE-VULN-KB/
├── .vscode/                # VSCode 配置文件
├── dist/                   # 构建产物目录
├── node_modules/           # 依赖包目录
├── public/                 # 静态资源
│   ├── favicon.svg         # 网站图标
│   └── icons.svg           # 图标雪碧图
├── src/                    # 源代码目录
│   ├── assets/             # 静态资源（图片、字体等）
│   ├── components/         # 通用组件
│   ├── data/               # 漏洞数据与配置
│   ├── router/             # 路由配置
│   ├── styles/             # 全局样式与主题
│   ├── views/              # 页面组件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .gitignore              # Git 忽略文件
├── index.html              # HTML 入口文件
├── package.json            # 项目依赖与脚本
├── package-lock.json       # 依赖版本锁定文件
├── vite.config.js          # Vite 配置文件
└── README.md               # 项目说明文档
```

---

## 🚀 快速开始

### 1. 环境准备
- Node.js 16+
- npm 或 yarn

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:5173` 即可预览项目。

### 4. 构建生产版本
```bash
npm run build
```

### 5. 本地预览构建产物
```bash
npm run preview
```

---

## 📊 数据结构说明
漏洞数据统一管理在 `src/data/` 目录下，采用 JSON 格式存储，便于维护和扩展。单个漏洞条目结构示例：
```json
{
  "id": "sql-injection",
  "name": "SQL 注入",
  "category": "注入类漏洞",
  "severity": "critical",
  "cwe": "CWE-89",
  "owasp": "A03:2021",
  "description": "攻击者通过用户输入拼接恶意 SQL 代码，从而操控数据库执行非预期查询，可导致数据泄露、篡改或删除。",
  "impact": "数据泄露、数据篡改、服务器被控制",
  "cause": "未对用户输入进行过滤/转义，直接拼接 SQL 语句",
  "prevention": [
    "使用预编译语句（Prepared Statement）",
    "使用 ORM 框架",
    "对用户输入进行严格校验和过滤"
  ],
  "code": {
    "unsafe": "...",
    "safe": "..."
  }
}
```

---

## 📚 漏洞分类与收录
当前版本收录 42 个漏洞条目，覆盖 15 个核心分类：
- 注入类漏洞（SQL/NoSQL/命令注入等）
- 身份认证缺陷
- 敏感数据泄露
- XML 外部实体
- 访问控制缺陷
- 安全配置错误
- 跨站脚本（XSS）
- 不安全的反序列化
- 已知漏洞组件
- 服务端请求伪造（SSRF）
- 密码学缺陷
- 竞态条件
- 业务逻辑漏洞
- 文件上传漏洞
- 路径遍历漏洞

漏洞风险等级分布：
- 严重（Critical）：12 条
- 高危（High）：23 条
- 中危（Medium）：7 条
- 低危（Low）：0 条

---

## 📝 如何贡献
我们欢迎社区贡献新的漏洞条目、修复错误或优化内容，贡献流程如下：
1. Fork 本仓库
2. 新建分支 `feature/new-vuln`
3. 在 `src/data/` 目录下添加/修改漏洞数据
4. 提交 PR，并附上漏洞来源与参考链接

---

## 📄 许可证
MIT License © 2025 VulnKB

---

## 💬 反馈与支持
如果你有任何问题或建议，欢迎提交 Issue 或 PR。

