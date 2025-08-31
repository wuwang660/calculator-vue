# 计算器项目 (Vue.js 重构版)

一个使用 Vue 3 重构的功能完整的响应式计算器应用。

## 🌟 在线演示

[点击这里查看项目演示](https://wuwang660.github.io/calculator-vue/)

或者访问：`https://wuwang660.github.io/calculator-vue/`

## 功能特点

- 基本数学运算（加、减、乘、除）
- 支持小数运算
- 支持百分比运算
- 清除和删除功能
- 历史记录功能
- 响应式设计，适配各种屏幕尺寸
- 简洁美观的用户界面
- 键盘支持

## 🚀 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Composition API** - Vue 3 组合式 API
- **Vite** - 下一代前端构建工具
- **CSS3** - 样式和动画效果

## 📦 项目结构

| 文件/目录 | 说明 |
|-----------|------|
| `public/index.html` | HTML 入口模板文件 |
| `src/assets/icons/` | 图标资源目录 |
| `src/assets/base.css` | 基础样式和全局变量 |
| `src/components/Display.vue` | 计算器显示屏幕组件 |
| `src/components/ButtonGid.vue` | 按钮网格布局组件 |
| `src/composables/useCalculator.js` | 计算器核心逻辑 |
| `src/App.vue` | Vue 根组件 |
| `src/main.js` | 应用入口文件 |
| `package.json` | 项目依赖和脚本配置 |
| `vite.config.js` | Vite 构建工具配置 |

## 🛠️ 安装和运行

### 环境要求

- Node.js 16.0+
- npm 或 yarn 或 pnpm

### 安装依赖

```sh
npm install
```

### 开发模式

```sh
npm run dev
```

### 构建生产版本

```sh
npm run build
```

### 预览生产版本

```sh
npm run preview
```

## 浏览器兼容性

支持所有现代浏览器，包括：
- Chrome (60+)
- Firefox (60+)
- Safari (12+)
- Edge (79+)

## 扩展功能建议

如需进一步开发，可考虑添加：
- 科学计算功能（平方根、幂运算等）
- 主题切换（深色/浅色模式）
- 内存功能（M+、M-、MR、MC）

## 版权声明

本项目基于开源理念开发，参考了常见的计算器实现方式。由于计算器界面和功能属于通用设计，不包含独特的创意或专利内容。
如果您是相关项目的作者并认为存在版权问题，请通过 Issue 联系我们。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个计算器项目。