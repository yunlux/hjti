import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
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
  title: "HJTI8 混合荣格类型指标 | 80 Preview",
  description:
    "HJTI8 混合荣格类型指标。80 Preview 最新题库为 80 题版本，融合荣格八维、MBTI 式类型推断与大五人格校准。关联：MBTI、荣格八维、16型人格、认知功能、人格测试。",
  keywords: [
    "HJTI",
    "HJTI8",
    "混合荣格类型指标",
    "Jungian functions",
    "MBTI",
    "cognitive functions",
    "personality test",
    "荣格八维",
    "人格测试",
    "MBTI测试",
    "16型人格",
    "认知功能",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">
        <div className="site-shell min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
