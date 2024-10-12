import React from 'react'

const YearBar = React.lazy(() => import('./YearBar'))
const AmountBar = React.lazy(() => import('./AmountBar'))
const DoughnutBar = React.lazy(() => import('./DoughnutBar'))
export {
    YearBar,
    AmountBar,
    DoughnutBar
}