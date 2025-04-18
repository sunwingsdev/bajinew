import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home/Home";
import Register from "@/pages/home/Register/Register";
import CategoryPage from "@/pages/home/CategoryPage/CategoryPage";
import PromotionalOffer from "@/pages/home/PromotionalOffer/PromotionalOffer";
import Vip from "@/pages/home/Vip/Vip";
import Referral from "@/pages/home/Referral/Referral";
import Login from "@/pages/home/Login/Login";
import Profile from "@/pages/home/Profile/Profile";
import Deposit from "@/pages/home/Deposit/Deposit";
import ProfileHome from "@/pages/home/ProfileHome/ProfileHome";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardDeposits from "@/pages/dashboard/DashboardDeposits/DashboardDeposits";
import WithdrawsHistory from "@/pages/dashboard/WithdrawsHistory/WithdrawsHistory";
import AdminRoute from "./AdminRoute";
import DashboardHome from "@/components/dashboard/DashboardHome";
import AgentTree from "@/pages/dashboard/AgentTree/AgentTree";
import Affilitors from "@/pages/dashboard/Affilitor/Affilitors";
import Games from "./../pages/dashboard/Games/Games";
import GamesApi from "@/pages/dashboard/GamesApi/GamesApi";
import HomeControl from "@/pages/dashboard/HomeControl/HomeControl";
import AdminLogin from "@/pages/home/AdminLogin/AdminLogin";
import Checkout from "@/pages/home/Checkout/Checkout";
import AllUsers from "@/pages/dashboard/users/AllUsers";
import UserProfile from "@/pages/dashboard/UserProfile/UserProfile";
import AgentProfile from "@/pages/dashboard/AgentProfile/AgentProfile";
import GameCategories from "@/pages/dashboard/GameCategori/GameCategories";
import FontendSlider from "@/pages/dashboard/Fontend/FontendSlider";
import PromotionsOffer from "@/pages/dashboard/Fontend/PromotionsOffer";
import Transection from "@/pages/Transections/Transection";
import DemoGame from "@/pages/home/DemoGame/DemoGame";
import Notice from "@/pages/dashboard/Fontend/Notice";
import Sponshorship from "@/pages/dashboard/Fontend/Sponshorship";
import ExchangeLayout from "@/layouts/ExchangeLayout";
import ExchangeMiddleContent from "@/components/exchange-page/ExchangeMiddleContent";
import InPlay from "@/pages/home/ExchangePage/InPlay";
import MultiMarkets from "@/pages/home/ExchangePage/MultiMarkets";
import Cricket from "@/pages/home/ExchangePage/Cricket";
import Soccer from "@/pages/home/ExchangePage/Soccer";
import Tennis from "@/pages/home/ExchangePage/Tennis";
import Esoccer from "@/pages/home/ExchangePage/Esoccer";
import BblWinner from "@/pages/home/ExchangePage/BblWinner";
import Kabaddi from "@/pages/home/ExchangePage/Kabaddi";
import Result from "@/pages/home/ExchangePage/Result";
import AddGamesOnGamesApiKey from "@/pages/dashboard/AddGames/AddGamesOnGamesApiKey";
import BecomeAnAgent from "@/pages/becomeAnAgent/BecomeAnAgent";
import CashAgentRoute from "./CashAgentRoute";
import CashAgentLayout from "@/layouts/CashAgentLayout";
import CashAgentHome from "@/pages/cash-agent/CashAgentHome";
import CashAgentProfile from "@/pages/cash-agent/CashAgentProfile";
import CashAgent from "@/pages/dashboard/CashAgent/CashAgent";
import Kyc from "@/pages/dashboard/kyc/Kyc";
import PaymentMethodRequests from "@/pages/dashboard/CashAgent/PaymentMethodRequests";
import Affiliators from "@/pages/dashboard/Affilitor/Affilitors";
import AllAffiliateLinks from "@/pages/dashboard/Affilitor/AllAffiliateLinks";
import BecomeAnAffiliate from "@/pages/becomeAnAffiliate/BecomeAnAffiliate";
import HomeAffiliate from "@/pages/becomeAnAffiliate/homeAffiliate/HomeAffiliate";
import TermsAndConditions from "@/pages/becomeAnAffiliate/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "@/pages/becomeAnAffiliate/privacyPolicy/PrivacyPolicy";
import Disconnection from "@/pages/becomeAnAffiliate/disconnection/Disconnection";
import Faqs from "@/pages/becomeAnAffiliate/faqs/Faqs";
import AffiliateLogin from "@/pages/affiliateLogin/AffiliateLogin";
import AffiliateSignUp from "@/pages/affiliateSignUp/AffiliateSignUp";
import AffiliateRoute from "./AffiliateRoute";
import AffiliatesLayout from "@/layouts/AffiliatesLayout";
import AffiliatesHome from "@/pages/affiliate-dashboard/AffiliatesHome";
import AffiliateProfile from "@/pages/affiliate-dashboard/AffiliateProfile";
import MyAffiliateLinks from "@/pages/affiliate-dashboard/MyAffiliateLinks";
import DepositMethod from "@/pages/dashboard/BankingDeposit/DepositMethod";
import DepositHistory from "@/pages/dashboard/BankingDeposit/DepositHistory";
import WithdrawHistory from "@/pages/dashboard/BankingWithdraw/WithdrawHistory";
import CommissionSetting from "@/pages/dashboard/Setting/CommissionSetting/CommissionSetting";
import UserDetailsPage from "@/pages/dashboard/UserDetailsPage/UserDetailsPage ";
import AdminProfile from "@/pages/dashboard/AdminProfile/AdminProfile";
import EditDepositMethodForm from "@/components/dashboard/bankingDeposit/depositMethod/EditDepositMethodForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/category/demo/:id", element: <DemoGame /> },
      { path: "/promotional-offer", element: <PromotionalOffer /> },
      { path: "/vip", element: <Vip /> },
      { path: "/referral", element: <Referral /> },
      {
        path: "/exchange-page",
        element: <ExchangeLayout />,
        children: [
          { path: "", element: <ExchangeMiddleContent /> },
          { path: "in-play", element: <InPlay /> },
          { path: "multi-markets", element: <MultiMarkets /> },
          { path: "cricket", element: <Cricket /> },
          { path: "soccer", element: <Soccer /> },
          { path: "tennis", element: <Tennis /> },
          { path: "e-soccer", element: <Esoccer /> },
          { path: "bbl-winner", element: <BblWinner /> },
          { path: "kabaddi", element: <Kabaddi /> },
          { path: "result", element: <Result /> },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "",
            element: (
              <PrivateRoute>
                <ProfileHome />
              </PrivateRoute>
            ),
          },
          { path: "deposit", element: <Deposit /> },
          { path: "transaction", element: <Transection /> },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      { path: "profile/:id", element: <AdminProfile /> },
      { path: "cashagent", element: <CashAgent /> },
      { path: "kyc", element: <Kyc /> },
      { path: "paymentmethodrequests", element: <PaymentMethodRequests /> },
      { path: "agentprofile/:id", element: <AgentProfile /> },
      { path: "affiliators", element: <Affiliators /> },
      { path: "allaffiliatelinks", element: <AllAffiliateLinks /> },
      {
        path: "user-profile/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "gameCategories",
        element: <GameCategories />,
      },
      {
        path: "addGames",
        element: <AddGamesOnGamesApiKey />,
      },
      {
        path: "agent",
        element: <AgentTree />,
      },
      {
        path: "affilitors",
        element: <Affilitors />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "gamesApi/:id",
        element: <GamesApi />,
      },
      {
        path: "deposits",
        element: <DashboardDeposits />,
      },

      {
        path: "fontendslider",
        element: <FontendSlider />,
      },
      {
        path: "promotionsoffer",
        element: <PromotionsOffer />,
      },
      {
        path: "notice",
        element: <Notice />,
      },
      {
        path: "sponsorship",
        element: <Sponshorship />,
      },
      {
        path: "home-controls",
        element: <HomeControl />,
      },
      { path: "depositmethod", element: <DepositMethod /> },
      { path: "edit-depositmethod/:id", element: <EditDepositMethodForm /> },
      { path: "deposithistory", element: <DepositHistory /> },
      { path: "withdraws", element: <WithdrawHistory /> },
      { path: "commissionsetting", element: <CommissionSetting /> },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/becomeanagent",
    element: <BecomeAnAgent />,
  },
  {
    path: "/cashagent",
    element: (
      <CashAgentRoute>
        <CashAgentLayout />
      </CashAgentRoute>
    ),

    children: [
      { path: "", element: <CashAgentHome /> },
      { path: "profile/:id", element: <CashAgentProfile /> },
    ],
  },
  {
    path: "/affiliate",
    element: <BecomeAnAffiliate />,
    children: [
      {
        path: "",
        element: <HomeAffiliate />,
      },
      {
        path: "termsandconditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "disconnection",
        element: <Disconnection />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
    ],
  },
  {
    path: "/affiliate/login",
    element: <AffiliateLogin />,
  },
  {
    path: "/affiliate/signup",
    element: <AffiliateSignUp />,
  },
  {
    path: "/affiliatesdashboard",
    element: (
      <AffiliateRoute>
        <AffiliatesLayout />
      </AffiliateRoute>
    ),
    children: [
      { path: "", element: <AffiliatesHome /> },
      { path: "profile/:id", element: <AffiliateProfile /> },
      { path: "myaffiliatelinks/:id", element: <MyAffiliateLinks /> },
    ],
  },
]);

export default router;
