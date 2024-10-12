import { TbReportAnalytics } from "react-icons/tb";
import { BiCategory, BiPurchaseTag } from "react-icons/bi";
import { RiUserLocationFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdEvent, MdDriveEta } from "react-icons/md";

export const links = [
<<<<<<< HEAD
    { name: 'Accuiel', to: '/dashboard', icon : <FaHome fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Activités', to: '/dashboard/evenements/' + new Date().toISOString().split('T')[0], icon : <MdEvent fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Chauffeurs', to: '/dashboard/Chauffeurs', icon : <MdDriveEta fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Guides', to: '/dashboard/guides', icon : <RiUserLocationFill fontSize={27} className="mr-2"/>, children : [] },
=======
    { name: 'Home', to: '/dashboard', icon : <FaHome fontSize={27} className="mr-2"/> },
    { name: 'Products', to: '/dashboard/products', icon : <FaShop fontSize={27} className="mr-2"/> },
    { name: 'Categories', to: '/dashboard/categories', icon : <BiCategory fontSize={27} className="mr-2"/> },
    { name: 'Orders', to: '/dashboard/orders', icon : <BiPurchaseTag fontSize={27} className="mr-2"/> },
    { name: 'Discounts', to: '/dashboard/discounts', icon : <BiPurchaseTag fontSize={27} className="mr-2"/> },
    { name: 'Trashed Products', to: '/dashboard/trashed-products', icon : <CgTrashEmpty fontSize={27} className="mr-2"/> },
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
  ];