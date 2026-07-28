import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Genesis Moment",
  description:
    "Stories of faith-based business owners, the people who believed in them, and what grew from that belief.",
  icons: {
    icon: "/brand/genesis-moment-mark.png",
    shortcut: "/brand/genesis-moment-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
