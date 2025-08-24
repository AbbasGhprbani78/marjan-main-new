import "../globals.css";
import Footer from "@/app/components/Footer";
import { NavBar } from "@/app/components/navBar";

export const metadata = {
  title: "Marjan",
  // description: "Marjan Website",
  // icons: {
  //   icon: "/images/logo1.png",
  // },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={locale === "fa" ? "font-fa" : "font-en"}>
        <div className="page-container">
          <NavBar />
          <main className="content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
