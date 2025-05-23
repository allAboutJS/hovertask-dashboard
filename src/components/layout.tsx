import { Outlet } from "react-router";
import Header from "./Header";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import getAuthUser from "../utils/getAuthUser";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slices/auth";
import Loading from "./Loading";

export default function RootLayout() {
  const [loadedAuthUser, setLoadedAuthUser] = useState<boolean | null>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (function fetchUser() {
      getAuthUser()
        .then((user) => (dispatch(setAuthUser(user)), setLoadedAuthUser(true)))
        .catch(fetchUser);
    })();
  }, [loadedAuthUser]);

  return (
    <>
      {loadedAuthUser && (
        <div>
          <Header />

          <div className="bg-container">
            <div className="mobile:grid grid-cols-[auto_1fr] max-w-6xl mx-auto mobile:px-4 gap-4">
              <aside className="max-mobile:hidden">
                <SideNav />
              </aside>
              <main className="overflow-hidden min-h-screen">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      )}

      {loadedAuthUser === false && <Loading fixed />}

      {}
    </>
  );
}
