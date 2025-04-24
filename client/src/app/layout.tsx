import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "blog - Login",
  description: "Join us to create your posts and discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
