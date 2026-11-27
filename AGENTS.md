# AGENTS.md — 项目规范（AI 接力必读）

> 本文件是任何 AI 助手（WorkBuddy / Qoder / Trae / 其他）接手本项目时的**唯一权威规范**。
> 开始任何修改前，请先完整阅读本文件。

---

## 1. 项目简介

| 项 | 内容 |
|----|------|
| 项目 | 刘曈晞（Tongxi (Terence) Liu）个人学术主页 |
| 线上地址 | https://tongxi-liu.github.io/ |
| 仓库 | Tongxi-Liu/Tongxi-Liu.github.io（分支 `main`） |
| 托管 | GitHub Pages（纯静态，无构建、无依赖） |

---

## 2. 文件结构

| 文件 | 作用 | 修改注意 |
|------|------|---------|
| `index.html` | **全部页面内容** | 见第 3 节「内容修改规则」 |
| `style.css` | 颜色、字体、间距、响应式布局 | 仅改样式 |
| `script.js` | 语言切换、汉堡菜单、返回顶部、版权年份 | 谨慎修改 |
| `assets/` | 头像等静态资源 | 替换照片放这里 |
| `AGENTS.md` | 本规范文件 | 变更需遵守版本规则 |
| `CHANGELOG.md` | 版本变更记录 | **每次改动必须同步更新** |

---

## 3. 内容修改规则（最重要）

1. **定位方法**：全部内容都在 `index.html`，按 `<!-- ============ 板块名 ============ -->` 注释定位。
2. **双语同步（强制）**：每个文本元素都有 `data-en`（英文）和 `data-zh`（中文）两个属性，**改内容必须两个都改**，否则切换语言会不一致。
   ```html
   <span data-en="English text" data-zh="中文内容"></span>
   ```
3. **版权年份勿硬编码**：年份由 `script.js` 自动生成，不要手写死年份。
4. **只改目标板块**：一次只改需求涉及的部分，不要"顺手"改动无关内容。

---

## 4. 内容速查表

| 想改的内容 | `index.html` 位置 |
|-----------|-------------------|
| 姓名 / 中文名 | Header 区块（`<h1>`） |
| 邮箱 / GitHub / LinkedIn | Header 区块 `social-icons` |
| 一句话自我介绍（Bio） | `#bio` 区块 |
| 研究兴趣 / 博士申请说明 | `#bio` 区块 |
| News 动态 | `#news` 区块 |
| 论文发表 | `#publications` 区块 |
| 项目经历 | `#projects` 区块 |
| 工作经历 | `#experience` 区块 |
| 教育背景 | `#education` 区块 |
| 技能列表 | `#skills` 区块 |
| 荣誉奖项 | `#awards` 区块 |

---

## 5. 常见修改模板

### 5.1 加一条 News

在 `#news` 的 `<table class="news-table">` 内新增一行：
```html
<tr valign="top"><td>[MM/YYYY]</td>
  <td data-en="English news content."
      data-zh="中文动态内容。"></td></tr>
```

### 5.2 加一个项目

在 `#projects` 区块复制一个 `.proj` 块，改标题、时间和要点：
```html
<div class="proj">
  <p class="proj-title">
    <b data-en="Project Title" data-zh="项目标题"></b><br>
    <span class="proj-meta" data-en="Role | MM/YYYY – MM/YYYY"
          data-zh="角色 | 年月 – 年月"></span>
  </p>
  <ul>
    <li data-en="Bullet point in English." data-zh="中文要点。"></li>
  </ul>
</div>
```

### 5.3 改板块标题（Bio / News 这一级）

需同步修改**两处、四个值**：
1. 顶部导航 `<a href="#xxx" data-en="Bio" data-zh="简介">Bio</a>`
2. 正文 `<h2 data-en="Bio" data-zh="简介">Bio</h2>`

---

## 6. Commit 规范

格式：`<type>: <描述>`

| type | 用途 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增响应式布局` |
| `fix` | 修复 | `fix: 修复移动端邮箱溢出` |
| `docs` | 文档 | `docs: 更新 CHANGELOG` |
| `style` | 样式 | `style: 调整导航配色` |
| `chore` | 杂项 | `chore: 更新头像` |

---

## 7. 版本号规则（语义化版本 SemVer）

- 格式：`v主版本.次版本.修订号`，如 `v1.3.0`
- 新增功能 / 较大改动 → **次版本 +1**（`v1.3.0` → `v1.4.0`）
- 小修复 / 文案微调 → **修订号 +1**（`v1.3.0` → `v1.3.1`）
- 结构性大改 → 主版本 +1（`v2.0.0`）

---

## 8. 发布流程

每次完成修改后，按顺序执行：

1. 确认双语已同步、CHANGELOG 已更新
2. `git add .`
3. `git commit -m "<type>: <描述>"`（遵守第 6 节规范）
4. `git tag -a vX.Y.Z -m "vX.Y.Z: <说明>"`
5. `git push origin main && git push origin --tags`
6. 到 GitHub 仓库 Releases 页面创建对应 Release

---

## 9. 回退操作

| 需求 | 命令 / 操作 |
|------|------------|
| 查看历史 | `git log --oneline --decorate` |
| 查看版本差异 | `git diff v1.2.1 v1.3.0` |
| 撤销最近一次提交 | `git revert HEAD`（安全，保留历史） |
| 撤销某次提交 | `git revert <提交号>` |
| 临时查看某版本 | `git checkout v1.2.1` |
| 彻底回退（危险） | `git reset --hard <提交号>` + 强推，仅在明确需要时使用 |

> GitHub 网页上也可对单次 commit 点 **Revert** 一键撤销。
