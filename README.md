# 金中昱 · 国风个人网站

当前版本：流动山水背景版。展示姓名已更正为 **金中昱**。

首页采用大字姓名与原始人像，中间为滚动联动的素材展廊及水墨太极视频，最后展示个人文字。全站共用暖黑色调的国画山水循环视频；首页文字与素材支持鼠标联动，并提供减少动态效果适配及背景暂停按钮。

## 下载与打开

- [单文件离线 HTML](downloads/金中昱_国风个人网站_流动山水背景版.html)：进入文件页后点击 Download raw file 下载，双击即可打开，图片和两段视频均已内嵌。
- [完整离线 ZIP](downloads/金中昱_国风个人网站_流动山水背景版.zip)：下载解压后打开 `index.html`，保留同目录的 `media` 文件夹。
- [当前网页源文件](index.html)：直接编辑其中的 HTML、CSS 和 JavaScript 即可继续修改。

仓库中的 HTML 文件需要下载或通过本地服务器打开；GitHub 文件预览不会直接运行网页。

## 个人介绍 PPT

已保存第一版「暖黑鎏金」，共 7 页，可编辑。

- [下载第一版 PPTX](presentations/01-warm-black-gold/金中昱个人介绍_暖黑鎏金.pptx?raw=true)
- [查看全 7 页预览与说明](presentations/01-warm-black-gold/README.md)

## 本地预览

无需安装 Node.js 依赖。将本仓库下载或克隆到本地，在仓库根目录执行：

```bash
python -m http.server 8000
```

然后打开 http://localhost:8000 。也可以直接双击根目录 `index.html`。

## 文件与素材

- `index.html`：最新版页面，图片及脚本内嵌。
- `media/山水云烟_国画背景.mp4`：24 秒、1600×900、无声循环背景，由开放馆藏国画局部加入镜头移动与云雾效果制作。
- `media/01_水墨太极.mp4`：个人说明书中的水墨太极视频。
- `downloads/`：可直接使用的单文件 HTML 与完整离线包。
- [使用说明与素材来源](docs/使用说明与素材来源.txt)：背景制作方式及来源；其他素材来源见网页底部。

人物采用个人说明书中的原始照片，保留正常肤色。背景原画来自 Cleveland Museum of Art 的 [Cloudy Mountains, 1933.220](https://www.clevelandart.org/art/1933.220)，按 [Open Access / CC0](https://www.clevelandart.org/open-access) 使用。国画视频为制作的动态背景，并非实拍风景。

## 版本说明

本次将最新版网页及离线文件保存到 GitHub，未更改现有线上部署，也未开启 GitHub Pages。

仓库原有 React / Vinext 网站工程及 Git 历史继续保留；根目录的静态 `index.html` 为本次最新版入口。旧工程运行方式及此前线上地址见 [旧版工程说明](docs/previous-framework.md)，该线上地址不代表本次最新版。
