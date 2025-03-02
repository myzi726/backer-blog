import type { Metadata } from "next";
import { Jua } from "next/font/google";
import Topbar from "@/layout/Topbar";

const jua = Jua({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Backer",
  description: "backer blog",
};

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jua.className}>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
