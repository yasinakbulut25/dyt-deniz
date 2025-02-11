import { Montserrat } from "next/font/google";
import "../styles/index.css";
import ClientProvider from "./ClientProvider";
import Main from "./main";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="html-content !p-0 no-scrollbar">
      <head>
        <meta
          name="keywords"
          content="Arzu Yurci, Dr. Arzu Yurci, Kadın Hastalıkları, Tüp Bebek, Gebelik Takibi, Doğum Uzmanı, Kadın Sağlığı, Kısırlık Tedavisi, Riskli Gebelik, Jinekolog"
        />
        <meta property="og:image" content="/uploads/page.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kadın Hastalıkları ve Doğum | Tüp Bebek Uzmanı"
        />
        <meta
          name="twitter:description"
          content="Kadın Hastalıkları ve Doğum, Tüp Bebek Uzmanı ile sağlığınıza önem verin. Gebelik takibi, kısırlık tedavisi ve tüp bebek uygulamalarında profesyonel destek alın."
        />
        <meta name="twitter:image" content="/uploads/page.png" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${montserrat.className} relative antialiased bg-white overflow-x-hidden`}
      >
        <ClientProvider>
          <Main>{children}</Main>
        </ClientProvider>
      </body>
    </html>
  );
}
