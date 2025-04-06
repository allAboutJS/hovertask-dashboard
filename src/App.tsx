import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/layout";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import "material-icons/iconfont/material-icons.css";
import Dashboard from "./pages/Dashboard";
import { HeroUIProvider } from "@heroui/react";
import MembershipPage from "./pages/MembershipPage";
import ChooseOnlinePaymentMethodPage from "./pages/ChooseOnlinePaymentMethodPage";
import FundWalletPage from "./pages/FundWalletPage";
import Earn from "./pages/earn/Earn";
import Tasks from "./pages/earn/Tasks";
import TaskInfoPage from "./pages/earn/TaskInfo";
import { Toaster } from "sonner";
import AdvertsPage from "./pages/earn/Adverts";
import ResellPage from "./pages/earn/Resell";

export default function App() {
  return (
    <HeroUIProvider>
      <Toaster richColors position="top-center" />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />} path="*">
              <Route index element={<Dashboard />} />
              <Route path="become-a-member" element={<MembershipPage />} />
              <Route path="choose-online-payment-method" element={<ChooseOnlinePaymentMethodPage />} />
              <Route path="fund-wallet" element={<FundWalletPage />} />

              {/* Earn by reselling */}
              <Route path="earn" element={<Earn />} />
              <Route path="earn/tasks" element={<Tasks />} />
              <Route path="earn/tasks/:id" element={<TaskInfoPage />} />
              <Route path="earn/adverts" element={<AdvertsPage />} />
              <Route path="earn/resell" element={<ResellPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
}
