import Auth from "./auth";
import Providers from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://canim-csr.vercel.app"),
  title: "Amit Doshi's Shot Glass Collection CMS",
  description:"Amit Doshi's Shot Glass Collection Content Management System",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Amit Doshi's Shot Glass Collection Content Management System",
    description:
      "Amit Doshi's Shot Glass Collection Content Management System",
    url: "",
    siteName: "Canim Template",
    images: "",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dhruvpurohit",
    title: "Amit Doshi's Shot Glass Collection Content Management System",
    description:
      "Amit Doshi's Shot Glass Collection Content Management System",
    image:
      "https://github.com/devhasibulislam/canim-ecommerce/blob/master/client/public/og.png?raw=true",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Auth>{children}</Auth>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
