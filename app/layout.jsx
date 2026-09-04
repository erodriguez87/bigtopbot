import "./globals.css";

export const metadata = {
  title: "BigTopBot | Consumer Robotics & Product Comparisons",
  description: "Detailed specifications, unbiased comparisons, and news for robot lawn mowers and vacuums.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
