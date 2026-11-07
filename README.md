# UCalgary CGSA 网站

React + Vite 多语言静态网站。所有页面在构建时预渲染，可部署到 GitHub Pages，无需运行后端。

## 本地开发

使用 Node.js 24：

```bash
npm ci
npm run dev
```

## 部署到 GitHub Pages

1. 在 GitHub 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 将项目文件（包括 `.github/workflows/deploy.yml` 和 `package-lock.json`）提交并推送到 `main`。
3. 在 **Actions** 中等待 **Deploy to GitHub Pages** 成功。

当前仓库的默认网址为 <https://ucalgarycgsa.github.io/home-page/>。
之后每次推送到 `main` 都会自动部署，也可以在 Actions 中手动运行工作流。
无需提交 `dist/` 或 `node_modules/`。

工作流通过 GitHub Pages 提供的站点信息自动设置资源路径和完整站点 URL，
用于内部导航、Logo、分享图片、canonical 和 sitemap。
每个路由均输出独立的 `index.html`，支持直接打开及刷新；未知地址使用 `404.html`。

## 本地验证生产构建

```bash
npm run typecheck
npm test
VITE_BASE_PATH=/home-page/ SITE_URL=https://ucalgarycgsa.github.io/home-page npm run build
npm run preview -- --base=/home-page/
```

打开 <http://localhost:4173/home-page/>。生产文件位于 `dist/`。
若部署到自定义域名根目录，使用 `VITE_BASE_PATH=/`，并将 `SITE_URL` 设为域名的完整 URL。
