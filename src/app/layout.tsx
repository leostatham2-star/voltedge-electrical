import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VoltEdge Electrical | Licensed Electricians in Columbus, Ohio",
  description:
    "VoltEdge Electrical is a family run electrical contractor in Columbus, Ohio. Panels, rewires, lighting, EV chargers, and 24/7 emergency repairs for homes and businesses.",
  keywords: [
    "electrician",
    "Columbus Ohio electrician",
    "electrical contractor",
    "panel upgrade",
    "EV charger installation",
    "emergency electrician",
  ],
  authors: [{ name: "VoltEdge Electrical" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "VoltEdge Electrical | Licensed Electricians in Columbus, Ohio",
    description:
      "Family run electrical contractor serving Columbus since 2009. Panels, rewires, lighting, EV chargers, and 24/7 emergency repairs.",
    siteName: "VoltEdge Electrical",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
