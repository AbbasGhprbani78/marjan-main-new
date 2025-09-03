import "../globals.css";
import { fetchHeaderFilter } from "@/services/header";
import { ToggleProvider } from "@/context/context";
import ImageLoadingWrapper from "@/components/ImageLoadingWrapper";
import ChatBot from "@/components/module/ChatBot/ChatBot";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/navBar";

export const metadata = {
  title: "Marjan",
  description: "Marjan Website",
  icons: {
    icon: "/images/logo1.png",
  },
};

export default async function RootLayout({ children, params }) {
  const locale = params.locale;
  const dir = locale === "fa" ? "rtl" : "ltr";
  const dataHeader = await fetchHeaderFilter(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={locale === "fa" ? "font-fa" : "font-en"}>
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
      </body>
    </html>
  );
}
