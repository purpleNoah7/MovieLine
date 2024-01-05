import { SideBar } from "../components/SideBar";

export default function SideLayout({ children }) {
  return (
    <div className="flex">
      <SideBar></SideBar>
      {children}
    </div>
  );
}
