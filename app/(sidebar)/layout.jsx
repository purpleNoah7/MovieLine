import { SideBar } from "../components/SideBar";

export default function SideLayout({ children }) {
  return (
    <div className="sm:flex justify-center">
      <SideBar></SideBar>
      {children}
    </div>
  );
}
