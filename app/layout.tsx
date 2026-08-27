import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://multilingual-learning-hub.mgq499243711.chatgpt.site",
  ),
  title: "Language Atelier",
  description:
    "面向高级语言表达、软件架构沟通与 Databricks 数据工程的个人学习空间。",
  openGraph: {
    title: "Language Atelier",
    description: "Databricks 数据工程路线，以及日语与英语专业表达。",
    images: [{ url: "/og.png", width: 1728, height: 910 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Language Atelier",
    description: "Databricks 数据工程路线，以及日语与英语专业表达。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
