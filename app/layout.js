import "./globals.css";

export const metadata = {
  title: "Calendra",
  description: "A beautiful interactive wall calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}