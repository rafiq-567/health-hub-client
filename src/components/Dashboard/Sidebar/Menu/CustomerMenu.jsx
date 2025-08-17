import MenuItem from './MenuItem'
import { RiSecurePaymentLine } from 'react-icons/ri'

const CustomerMenu = () => {
 

  return (
    <>
    <h3 className="px-4 text-xs text-gray-500 uppercase mb-2">Customer Panel</h3>
      <MenuItem icon={RiSecurePaymentLine} label='user payment history' address='user-payment-history' />

      
        

      

    
    </>
  )
}

export default CustomerMenu
