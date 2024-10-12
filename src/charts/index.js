<<<<<<< HEAD
import React from 'react'

const YearBar = React.lazy(() => import('./YearBar'))
const AmountBar = React.lazy(() => import('./AmountBar'))
const DoughnutBar = React.lazy(() => import('./DoughnutBar'))
export {
    YearBar,
    AmountBar,
    DoughnutBar
=======
import React from "react";

const Order_count = React.lazy(() => import("./Order_count"));
const Order_profit = React.lazy(() => import("./Order_profit"));
const Visites = React.lazy(() => import("./Visites"));
const Categories_views = React.lazy(() => import("./Categories_views"));

export {
    Categories_views,
    Visites,
    Order_count,
    Order_profit
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
}