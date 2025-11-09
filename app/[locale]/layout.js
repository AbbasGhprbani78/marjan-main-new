import "../globals.css";
import { fetchHeaderFilter } from "@/services/header";
import { ToggleProvider } from "@/context/context";
import { TranslationProvider } from "@/context/TranslationContext";
import ImageLoadingWrapper from "@/components/ImageLoadingWrapper";
import ChatBot from "@/components/module/ChatBot/ChatBot";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/navBar";
import TopProgressBar from "@/components/module/TopProgressBar";
import { fetchTranslateWords } from "@/services/translate";

export const metadata = {
  icons: {
    icon: "/images/logo3.ico",
  },
};

export default async function RootLayout({ children, params }) {
  const locale = params.locale || "fa";

  const dir = ["fa", "ar"].includes(locale) ? "rtl" : "ltr";
  const fontClass = ["fa", "ar"].includes(locale)
    ? "font-fa"
    : locale === "ru"
    ? "font-ru"
    : "font-en";

  const dataHeader = await fetchHeaderFilter(locale);
  const dictArray = await fetchTranslateWords(locale);

  const dict = dictArray.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <html lang={locale} dir={dir}>
      <body className={fontClass}>
        <TranslationProvider dict={dict} locale={locale}>
          <TopProgressBar />
          <ToggleProvider>
            <ImageLoadingWrapper>
              <div className="page-container">
                <NavBar dataHeader={dataHeader} />
                <main className="content">{children}</main>
                <Footer />
              </div>
              <ChatBot />
            </ImageLoadingWrapper>
          </ToggleProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
