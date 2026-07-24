import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lịch tập BK-1999 Pro | Kế hoạch 6 + 1",
  description: "Lịch tập 6 ngày khoa học dành cho giàn tạ đa năng BK-1999 Pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
