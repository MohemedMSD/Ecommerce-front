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
	Drivers,
	Guides,
	EventsRaports,
	GuidesRaports,
	DriversRaports,
	Facture
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
			// {
			// 	path: '/auth/send-verification-code',
			// 	element: <SendVerifyCode />,
			// },
			// {
			// 	path: '/auth/email-verification/:token',
			// 	element: <EmailVerification />,
			// },
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
				path : '/dashboard/guides',
				element : <FunctionsContextPaginationGD><Guides /></FunctionsContextPaginationGD>
			}
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