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

当前生产网址为 <https://uccgsa.club/>。
在 GitHub 仓库 **Settings → Pages → Custom domain** 中设置 `uccgsa.club`。
之后每次推送到 `main` 都会自动部署，也可以在 Actions 中手动运行工作流。
无需提交 `dist/` 或 `node_modules/`。

工作流按自定义域名设置 `VITE_BASE_PATH=/` 和 `SITE_URL=https://uccgsa.club`，
用于内部导航、Logo、分享图片、canonical 和 sitemap。
`public/CNAME` 会随构建复制到 `dist/CNAME`。
修改 GitHub Pages 域名设置后，需要重新运行部署，旧构建里的资源路径不会自动改变。
每个路由均输出独立的 `index.html`，支持直接打开及刷新；未知地址使用 `404.html`。

## 本地验证生产构建

```bash
npm run typecheck
npm test
VITE_BASE_PATH=/ SITE_URL=https://uccgsa.club npm run build
npm run preview
```

打开 <http://localhost:4173/>。生产文件位于 `dist/`。
以后更换域名时，同步更新工作流里的 `SITE_URL`、`public/CNAME` 和 GitHub Pages 的 Custom domain，然后重新部署。
若改回 `https://ucalgarycgsa.github.io/home-page/`，移除自定义域名及 `public/CNAME`，
将工作流的 `VITE_BASE_PATH` 改为 `/home-page/`，`SITE_URL` 改为该完整网址。
