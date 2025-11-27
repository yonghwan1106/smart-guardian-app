import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "Smart Guardian - 안심 귀가 서비스",
  description: "여성 안전을 위한 스마트 가디언 앱",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(outfit.variable, notoSansKr.variable, "bg-[#F8FAFC] flex justify-center min-h-screen")}>
        <div className="w-full max-w-[430px] bg-white min-h-screen relative shadow-xl overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
