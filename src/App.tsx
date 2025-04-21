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
import ConnectAccountsPage from "./pages/earn/ConnectAccounts";
import ListProductPage from "./pages/marketplace/ListProduct";
import MarketplacePage from "./pages/marketplace/Marketplace";
import CategoryPage from "./pages/marketplace/Category";
import SingleProductPage from "./pages/marketplace/SingleProduct";
import SellerPage from "./pages/marketplace/Seller";
import AdvertisePage from "./pages/advertise/Advertise";
import CartPage from "./pages/marketplace/Cart";
import ProductCheckoutPage from "./pages/marketplace/ProductCheckout";
import AddMeUp from "./pages/AddMeUp/AddMeUp";
import Profile from "./pages/AddMeUp/Profile";
import ListProfile from "./pages/AddMeUp/ListProfile";
import ListProfileForm from "./pages/AddMeUp/ListProfileForm";
import PointsPage from "./pages/AddMeUp/Points";
import EditProfilePage from "./pages/EditProfile";
import UpdateBankDetailsPage from "./pages/UpdateBankDetails";
import ReferAndEarnPage from "./pages/ReferAndEarn/ReferAndEarn";
import TransactionsHistoryPage from "./pages/TransactionsHistory";
import SingleTransactionPage from "./pages/SingleTransaction";
import ChangePasswordPage from "./pages/ChangePassword";
import UpdateLocationPage from "./pages/UpdateLocation";
import NotificationsPage from "./pages/Notifications";
import TermsPage from "./pages/Terms";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import ProductListingsPage from "./pages/marketplace/ProductListings";
import ProductPerformancePage from "./pages/marketplace/ProductPerformance";

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
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="update-bank-details" element={<UpdateBankDetailsPage />} />
              <Route path="transactions-history" element={<TransactionsHistoryPage />} />
              <Route path="transactions-history/:id" element={<SingleTransactionPage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="update-location" element={<UpdateLocationPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              {/* Earn by reselling */}
              <Route path="earn" element={<Earn />} />
              <Route path="earn/tasks" element={<Tasks />} />
              <Route path="earn/tasks/:id" element={<TaskInfoPage />} />
              <Route path="earn/adverts" element={<AdvertsPage />} />
              <Route path="earn/resell" element={<ResellPage />} />
              <Route path="earn/connect-accounts" element={<ConnectAccountsPage />} />
              {/* Marketplace */}
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="marketplace/list-product" element={<ListProductPage />} />
              <Route path="marketplace/c/:category" element={<CategoryPage />} />
              <Route path="marketplace/p/:id" element={<SingleProductPage />} />
              <Route path="marketplace/s/:id" element={<SellerPage />} />
              <Route path="marketplace/cart" element={<CartPage />} />
              <Route path="marketplace/checkout/:id" element={<ProductCheckoutPage />} />
              <Route path="marketplace/listings" element={<ProductListingsPage />} />
              <Route path="marketplace/performance" element={<ProductPerformancePage />} />
              {/* Advertise */}
              <Route path="advertise" element={<AdvertisePage />} />
              {/* Add Me Up */}
              <Route path="add-me-up" element={<AddMeUp />} />
              <Route path="add-me-up/profile" element={<Profile />} />
              <Route path="add-me-up/list-profile" element={<ListProfile />} />
              <Route path="add-me-up/list-profile-form" element={<ListProfileForm />} />
              <Route path="add-me-up/points" element={<PointsPage />} />
              {/* Refer and Earn */}
              <Route path="refer-and-earn" element={<ReferAndEarnPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
}
