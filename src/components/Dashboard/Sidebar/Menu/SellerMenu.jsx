import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdAddHomeWork, MdHomeWork, MdOutlineManageHistory, MdOutlinePayment } from 'react-icons/md'
import MenuItem from './MenuItem'
import { AiFillMedicineBox } from 'react-icons/ai'
import { RiAdvertisementLine } from 'react-icons/ri'


const SellerMenu = () => {
  return (
    <>
    <h3 className="px-4 text-xs text-gray-500 uppercase mb-2">Seller Panel</h3>

      <MenuItem
        icon={MdAddHomeWork}
        label='Seller Home'
        address='seller'
      />

      <MenuItem
        icon={AiFillMedicineBox}
        label='Manage Medicine'
        address='manage-medicine'
      />

      <MenuItem icon={MdOutlinePayment} label='Payment History' address='payment-history' />

      <MenuItem
        icon={RiAdvertisementLine}
        label='Ask for Advertisement'
        address='advertise-request'
      />
    </>
  )
}

export default SellerMenu
