import { Outlet } from "react-router";
import Header from "./Header";
import SideNav from "./SideNav";

export default function RootLayout() {
  return (
    <div>
      <Header />

      <div className="bg-container">
        <div className="mobile:grid grid-cols-[auto_1fr] max-w-5xl mx-auto mobile:px-4 gap-4">
          <aside className="max-mobile:hidden">
            <SideNav />
          </aside>
          <main className="overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
