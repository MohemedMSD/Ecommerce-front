import React from "react";
const Dashboard = React.lazy(() => import("./Dashboard"));
const Login = React.lazy(() => import("./auth/Login"));
const Register = React.lazy(() => import("./auth/Register"));
const Evenement = React.lazy(() => import("./Evenement"));
const Auth = React.lazy(() => import("./auth/Auth"));
const GuestLayout = React.lazy(() => import("./auth/GuestLayout"));
const HomeDashboard = React.lazy(() => import("./HomeDashboard"));
const SendVerifyCode = React.lazy(() => import("./auth/SendVerifyCode"));
const EmailVerification = React.lazy(() => import("./auth/EmailVerification"));
const ForgetPassword = React.lazy(() => import("./auth/ForgetPassword"));
const ResetPassword = React.lazy(() => import("./auth/ResetPassword"));
<<<<<<< HEAD
const Drivers = React.lazy(() => import("./Drivers"));
const Guides = React.lazy(() => import("./Guides"));
const EventsRaports = React.lazy(() => import("./EventsRaports"));
const GuidesRaports = React.lazy(() => import("./GuidesRaports"));
const DriversRaports = React.lazy(() => import("./DriversRaports"));
const Facture = React.lazy(() => import("./Facture"));

export {
  Facture,
  ForgetPassword,
  EventsRaports,
  GuidesRaports,
  DriversRaports,
  Guides,
  Drivers,
  ResetPassword,
  SendVerifyCode,
  EmailVerification,
=======
const DiscountsManagements = React.lazy(() => import("./DiscountsManagements"));
const ReviewsPage = React.lazy(() => import("./ReviewsPage"));
const StockEmpty = React.lazy(() => import("./StockEmpty"));

export {
  StockEmpty,
  ForgetPassword,
  DiscountsManagements,
  ResetPassword,
  SendVerifyCode,
  EmailVerification,
  LandingPage,
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
  Dashboard,
  Login,
  Register,
  Evenement,
  Auth,
  GuestLayout,
  HomeDashboard,
  ReviewsPage
};
