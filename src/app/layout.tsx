import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 Importy komponentów
import { Toaster } from "@/_components/ui/sonner";
import { Footer } from "@/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

// 👇 SEO - To czytają boty Google
export const metadata: Metadata = {
  title: "UTM Architect | Darmowy Kreator Linków UTM & Presety",
  description:
    "Najszybszy sposób na tworzenie linków UTM. Zapisuj szablony (Presety), generuj linki do Google Analytics i oszczędzaj czas. Bez logowania, 100% lokalnie.",
  keywords: [
    "utm builder",
    "kreator linków utm",
    "google campaign url builder",
    "linki śledzące",
    "google analytics utm",
    "utm generator free",
    "narzędzia marketingowe",
    "utm templates",
  ],
  authors: [{ name: "Mikołaj Cholewa" }],
  openGraph: {
    title: "UTM Architect - Buduj linki szybciej",
    description:
      "Koniec z ręcznym wpisywaniem źródła i medium. Zapisz szablony i generuj linki w 3 sekundy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Główna treść rozciąga się, żeby wypchnąć footer na dół */}
        <div className="flex-1">{children}</div>

        {/* Footer na samym dole */}
        <Footer />

        {/* Powiadomienia (Toast) */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
