import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VoltX — Cybersecurity Advisor for Small Business",
    template: "%s | VoltX",
  },
  description:
    "Problem-first cybersecurity & privacy advisor for small businesses. Get fitted security recommendations — not generic product lists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
