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
          content="Diyetisyen Almina Meşin, Almina Meşin, Uzm. Diyetisyen Almina Meşin, Diyetisyen, Beslenme Uzmanı, Sağlıklı Beslenme, Kilo Verme, Kilo Alma, Online Diyet, Sporcu Beslenmesi, Gebelikte Beslenme, Çocuk Beslenmesi, Diyet Programı, Kişiye Özel Diyet, Sağlıklı Yaşam, Beslenme Danışmanlığı"
        />
        <meta property="og:image" content="/uploads/page.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Uzm. Diyetisyen Almina Meşin | Beslenme uzmanı"
        />
        <meta
          name="twitter:description"
          content="Sağlıklı beslenme ve ideal kilo yönetimi için uzman desteği alın. Kişiye özel diyet programları, kilo verme, sağlıklı yaşam ve beslenme danışmanlığı hizmetleriyle yanınızdayız."
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
