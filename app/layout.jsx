import { SideBar } from "./components/SideBar";
import "./globals.css";

export const metadata = {
  title: "MovieLine",
  description: "A app for search Movies and series",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
