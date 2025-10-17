import { Toaster } from "sonner";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  title: "CRM System",
  description: "CRM system built with Next.js and React Query",
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
