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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
}
