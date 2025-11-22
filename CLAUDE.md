# CLAUDE.md - Sanmu Dashboard Project Memory

## 1. 项目愿景 (Project Vision)
打造一个以数据为核心的个人技术帝国基石——`sanmu_dashboard`。
集成数据采集、高性能处理、AI 分析与可视化大屏。

## 2. 技术栈 (Tech Stack)
- **前端**: Vue 3 + TypeScript + Naive UI + ECharts
- **后端**: FastAPI (Python) + C++ Extensions (Pybind11)
- **数据**: PostgreSQL + TimescaleDB + Redis
- **配置**: YAML 驱动 (GitOps)

## 3. 开发与文档规范 (Standards)
- **文档风格**:
    - 使用 Emoji 🎨 增强标题和列表的可读性。
    - 关键技术名词使用 **加粗**。
    - 复杂逻辑必须通过 **Mermaid** 图表展示。
- **Mermaid 绘图规范**:
    - **配色**: 使用 `classDef` 定义主题色，区分不同模块（如前端绿、后端橙、数据库紫）。
    - **宏观布局**: 使用 `graph TB` (自上而下)。层级之间使用隐藏线 `A ~~~ B` 强制垂直对齐。
    - **微观布局**: 子图(subgraph)内部尽量使用 `direction LR` (左右排列) 以节省纵向空间。
    - **节点**: 文本必须包含在双引号中，支持中文和 Emoji。例: `Node["👤 用户"]`
    - **连线**: 标签紧贴箭头，不留空格。例: `A -->|数据流| B`

## 4. 当前状态 (Current Status)
- **阶段**: 环境搭建 (Environment Setup)。
- **下一步**: 初始化后端 (FastAPI) 与前端 (Vue 3) 骨架。

## 5. 常用命令 (Commands)
*(待补充)*
