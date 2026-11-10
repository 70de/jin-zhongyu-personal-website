# 金中昱的个人网站

国风个人网站，结合个人介绍、影视剪辑经历、国学兴趣和可探索的三维山水小园。

线上网站：[访问金中昱的个人网站](https://jin-zhongyu-inner-landscape.carvedchaff1.chatgpt.site)

## 本地运行

需要 Node.js 22.13 或更高版本，以及 npm。

```bash
npm ci
npm run dev
```

打开终端输出的本地网址，即可预览网站。

```bash
npm run build
```

构建输出位于 `dist/`。项目采用 Vinext、React、TypeScript 和 Three.js，并保留 Sites 的 Cloudflare Workers 构建配置。

## 主要文件

- `app/page.tsx`：页面内容、个人介绍、栏目和交互入口。
- `app/globals.css`：配色、字体、布局及手机适配。
- `app/layout.tsx`：网页标题、描述、语言和图标设置。
- `components/personal/InkGarden.tsx`：三维山水小园、地标及漫游交互。
- `public/`：网站图片和图标。
- `package.json`、`package-lock.json`：项目依赖与锁定版本。
- `scripts/`、`worker/`、`.openai/hosting.json`：构建与现有 Sites 部署配置。

## 保存与继续修改

此仓库保留了网站现有源码和之前的 Git 修改历史。图片和运行所需配置一并保存；安装依赖、缓存和登录凭据不进入仓库。

后续修改后，提交并推送到 GitHub：

```bash
git add .
git commit -m "Update personal website"
git push origin main
```

GitHub 保存的是代码与版本历史；现有网站仍由 Sites 托管。后续若在其他文件夹或 Sites 中修改，需要把对应改动同步回此仓库。

图片说明：`public/forest.jpg` 来自 Unsplash，原始地址为 https://images.unsplash.com/photo-1441974231531-c6227db76b6e 。
