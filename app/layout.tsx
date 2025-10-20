import { Toaster } from "sonner";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  title: "CRM System",
  description: "CRM system built with Next.js and React Query",
  openGraph: {
    title: "CRM System - Manage your business easily",
    description:
      "Powerful CRM system built with Next.js, React Query, and Tailwind CSS.",
    url: "https://crm-system-v7uu.vercel.app/",
    siteName: "CRM System",
    images: [
      {
        url: "https://crm-system-v7uu.vercel.app/crm.jpg", 
        width: 1200,
        height: 630,
        alt: "CRM System Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM System - Manage your business easily",
    description:
      "Powerful CRM system built with Next.js, React Query, and Tailwind CSS.",
    images: ["https://crm-system-v7uu.vercel.app/crm.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
