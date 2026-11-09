import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL("https://jin-xiujuan.carvedchaff1.chatgpt.site"),
 title: "金秀娟｜一方天地，动静皆风景",
 description: "金秀娟的个人网站。来自上海，学习影视剪辑，喜欢国学、研读经典与静心独处。沉静思考，真诚表达。",
 icons: {icon:"/favicon.svg",shortcut:"/favicon.svg"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}

