import "./globals.css";

export const metadata = {
  title: "Furniture Company",
  description: "The Furniture of the Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100">
        <main>{children}</main>
        <footer className="bg-gray-900 text-white p-4 text-center">
          <p>&copy; 2024 Furniture Co. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
