import { Outlet } from "react-router";
import Header from "./Header";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import getAuthUser from "../utils/getAuthUser";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slices/auth";

export default function RootLayout() {
  const [loadedAuthUser, setLoadedAuthUser] = useState<boolean | null>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuthUser()
      .then((user) => (dispatch(setAuthUser(user)), setLoadedAuthUser(true)))
      .catch((err) => {
        console.error(err);
        setLoadedAuthUser(null);
      });
  }, [loadedAuthUser]);

  return (
    <>
      {loadedAuthUser && (
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
      )}

      {loadedAuthUser === false && (
        <div className="flex items-center justify-center h-screen">
          <img src="/images/loading.gif" alt="" />
        </div>
      )}

      {}
    </>
  );
}
