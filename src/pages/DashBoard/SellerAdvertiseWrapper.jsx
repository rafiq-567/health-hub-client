import UseAuth from '../../hooks/UseAuth';
import LoadingSpinner from '../LoadingSpinner';
import AdvertiseRequest from './SellerDashboard/AdvertiseRequest';

const SellerAdvertiseWrapper = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  
  // This is where you get the email and pass it down
  const sellerEmail = user?.email;

  if (!sellerEmail) {
    return <p className="p-4 text-red-500">Could not find user email. Please log in again.</p>;
  }

  return <AdvertiseRequest sellerEmail={sellerEmail} />;
};

export default SellerAdvertiseWrapper;