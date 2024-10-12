import React from "react";
const Header  = React.lazy(()=>import("./dashboard/Header"))
const EvenementM  = React.lazy(()=>import("./dashboard/modals/EvenementM"))
const CheffeurM  = React.lazy(()=>import("./dashboard/modals/drivers/CheffeurM"))
const GuideM  = React.lazy(()=>import("./dashboard/modals/guides/GuideM"))
const GuidesCom  = React.lazy(()=>import("./dashboard/modals/guides/GuidesCom"))
const DriversCom  = React.lazy(()=>import("./dashboard/modals/drivers/DriversCom"))
const Restauration  = React.lazy(()=>import("./dashboard/modals/restauration/Restauration"))
const Services  = React.lazy(()=>import("./dashboard/modals/services/Services"))
const ExtrasCom  = React.lazy(()=>import("./dashboard/modals/extras/ExtrasCom"))
const PrintM  = React.lazy(()=>import("./dashboard/modals/PrintM"))
const ProfileM  = React.lazy(()=>import("./dashboard/modals/ProfileM"))
const Loading  = React.lazy(()=>import("./Loading"))
const Profile  = React.lazy(()=>import("./Profile"))
const SideBar  = React.lazy(()=>import("./SideBar"))
<<<<<<< HEAD
const DriverPyInfo = React.lazy(()=> import('./GuideAndDriver/DriverPyInfo'))
const DriverArchPy = React.lazy(()=> import('./GuideAndDriver/DriverArchPy'))
const DAPRow = React.lazy(()=> import('./GuideAndDriver/DAPRow'))
const GuidePyInfo = React.lazy(()=> import('./GuideAndDriver/GuidePyInfo'))
const GuideArchPy = React.lazy(()=> import('./GuideAndDriver/GuideArchPy'))
const GAPRow = React.lazy(()=> import('./GuideAndDriver/GAPRow'))
const Timer = React.lazy(()=> import('./Timer'))
=======
const MyOrders = React.lazy(() => import('./landingPage/MyOrders'));
const Timer = React.lazy(() => import('./Timer'));
const Services = React.lazy(() => import('./Services'));
const Categories_Com = React.lazy(() => import('./landingPage/Categories'));
const FooterBanner = React.lazy(()=> import('./landingPage/FooterBanner'))
const Partners = React.lazy(()=> import('./landingPage/Partners'))
const Review = React.lazy(()=> import('./landingPage/Review'))
const DiscountM = React.lazy(()=> import('./dashboard/modals/DiscountM'))
const CostumeSelect = React.lazy(()=> import('./dashboard/CostumeSelect'))
const Comments = React.lazy(()=> import('./dashboard/Comments'))
const ReviewsDetails = React.lazy(()=> import('./dashboard/modals/ReviewsDetails'))
const AddReview = React.lazy(()=> import('./landingPage/AddReview'))
const ReviewImages = React.lazy(()=> import('./landingPage/modals/ReviewImages'))
const CostumerAdress = React.lazy(()=> import('./landingPage/modals/CostumerAdress'))
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185

export {
    CostumerAdress,
    CostumeSelect,
    ReviewImages,
    AddReview,
    Review,
    ReviewsDetails,
    Comments,
    Partners,
    DiscountM,
    FooterBanner,
    Categories_Com,
    Services,
    Timer,
    SideBar,
    Timer,
    ExtrasCom,
    Loading,
    Header,
    Services,
    Profile,
    EvenementM,
    Restauration,
    ProfileM,
    CheffeurM,
    DriversCom,
    GuidesCom,
    GuideM,
    DriverPyInfo,
    DriverArchPy,
    DAPRow,
    GuidePyInfo,
    GuideArchPy,
    GAPRow,
    PrintM
}