import { TbReportAnalytics } from "react-icons/tb";
import { BiCategory, BiPurchaseTag } from "react-icons/bi";
import { RiUserLocationFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdEvent, MdDriveEta } from "react-icons/md";

export const links = [
    { name: 'Accuiel', to: '/dashboard', icon : <FaHome fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Activités', to: '/dashboard/evenements/' + new Date().toISOString().split('T')[0], icon : <MdEvent fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Chauffeurs', to: '/dashboard/Chauffeurs', icon : <MdDriveEta fontSize={27} className="mr-2"/>, children : [] },
    { name: 'Guides', to: '/dashboard/guides', icon : <RiUserLocationFill fontSize={27} className="mr-2"/>, children : [] },
  ];