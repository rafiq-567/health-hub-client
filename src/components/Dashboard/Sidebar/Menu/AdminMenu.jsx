import { FaHome, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BiCategory } from "react-icons/bi";
import { MdOutlinePayments } from 'react-icons/md';
import { FcSalesPerformance } from 'react-icons/fc';
import { RiAdvertisementFill } from "react-icons/ri";



const AdminMenu = () => {
    return (
        <>
            <h3 className="px-4 text-xs text-gray-500 uppercase mb-2">Admin Panel</h3>

            <MenuItem icon={FaHome} label="Admin Home" address="admin" />

            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />

            <MenuItem
                icon={BiCategory}
                label='manage category'
                address='manage-category'
            />

            <MenuItem icon={MdOutlinePayments} label='payment management' address='payment-management' />

            <MenuItem icon={FcSalesPerformance} label='sales report' address='sales-report' />

            <MenuItem icon={RiAdvertisementFill} label='manage banner advertise' address='advertised-medicines' />
        </>
    )
}

export default AdminMenu
