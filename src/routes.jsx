import { createBrowserRouter, Navigate } from "react-router-dom";

import './App.css'
import {
	Evenement,
	GuestLayout,
	Auth,
	Dashboard,
	Login,
	Register,
	HomeDashboard,
	SendVerifyCode,
	EmailVerification,
	ForgetPassword,
	ResetPassword,
<<<<<<< HEAD
	Drivers,
	Guides,
	EventsRaports,
	GuidesRaports,
	DriversRaports,
	Facture
=======
	DiscountsManagements,
	ReviewsPage
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
} from "./pages";

import FunctionsContextPaginationGD from "./context/StatePaginateGuideDriver";

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <GuestLayout />,
		children: [
			{
				path: '/auth/login',
				element: <Login />,
			},
			{
				path: '/auth/register',
				element: <Register />,
			},
<<<<<<< HEAD
			// {
			// 	path: '/auth/send-verification-code',
			// 	element: <SendVerifyCode />,
			// },
			// {
			// 	path: '/auth/email-verification/:token',
			// 	element: <EmailVerification />,
			// },
=======
			{
				path: '/auth/send-verification-code',
				element: <SendVerifyCode />,
			},
			{
				path: '/auth/email-verification/:token',
				element: <EmailVerification />,
			},
			{
				path: '/auth/forget-password',
				element: <ForgetPassword />,
			},
			{
				path: '/auth/reset-password/:token',
				element: <ResetPassword />,
			},
		],
	},
	{
		path: '/',
		element: <Auth />,
		children: [
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
			{
				path: '/auth/forget-password',
				element: <ForgetPassword />,
			},
			{
<<<<<<< HEAD
				path: '/auth/reset-password/:token',
				element: <ResetPassword />,
=======
				path: '/cancel/:CHECKOUT_SESSION_ID',
				element: <CancelCom />,
			},
			{
				path: '/',
				element: <LandingPage />,
			},
			{
				path: '/products/:id',
				element: <ProductDetails />,
			},
			{
				path: '/products-search/:query',
				element: <Search />,
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
			},
			{
				path: '/products/review/:id',
				element: <ReviewsPage />,
			}
		],
	},
    {
        path: '/dashboard',
		element: <Dashboard />,
        children : [
			{
				path : '/dashboard',
				element : <HomeDashboard />	
			},
			{
				path : '/dashboard/evenements/:date',
				element : <Evenement />
			},
			{
				path : '/dashboard/Chauffeurs',
				element : <FunctionsContextPaginationGD><Drivers /></FunctionsContextPaginationGD>
			},
			{
<<<<<<< HEAD
				path : '/dashboard/guides',
				element : <FunctionsContextPaginationGD><Guides /></FunctionsContextPaginationGD>
			}
=======
				path : '/dashboard/orders',
				element : <OrdersManagement />
			},
			{
				path : '/dashboard/discounts',
				element : <DiscountsManagements />
			},
			{
				path : '/dashboard/trashed-products',
				element : <TrashedProducts />
			},
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
        ]
    },
    {
        path : '/pdf',
        element : <Facture />
    },
	{
        path : '*',
        element : <Navigate to='/dashboard'/>
    }
]);

export default router;