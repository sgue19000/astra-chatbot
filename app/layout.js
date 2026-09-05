import "./globals.css";

export const metadata = {
  title: "Astra Chat",
  description: "Chat with gpt-6-astra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
