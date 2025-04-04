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

export default function App() {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />} path="*">
              <Route index element={<Dashboard />} />
              <Route path="become-a-member" element={<MembershipPage />} />
              <Route path="choose-online-payment-method" element={<ChooseOnlinePaymentMethodPage />} />
              <Route path="fund-wallet" element={<FundWalletPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
}
