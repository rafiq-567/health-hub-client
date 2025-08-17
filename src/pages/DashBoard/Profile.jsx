// Profile.jsx
import UseAuth from '../../hooks/UseAuth';
import UserPaymentHistory from '../../pages/DashBoard/UserDashboard/UserPaymentHistory';
import LoadingSpinner from '../../pages/LoadingSpinner'; // LoadingSpinner ইম্পোর্ট করুন

const Profile = () => {
  const { user, loading } = UseAuth(); 

  if (loading) {
    return <LoadingSpinner />; 
  }

  // user অবজেক্ট লোড হওয়ার পর, তার email ব্যবহার করুন
  // currentUserEmail এর প্রয়োজন নেই, সরাসরি user?.email ব্যবহার করতে পারেন
  const userEmail = user?.email; 
console.log(userEmail)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {/* যদি user.email থাকে, তবে দেখান, অন্যথায় কিছু বার্তা */}
      <p>Email: {userEmail || 'ইমেল উপলব্ধ নয়'}</p> 
      {/* এখানে আরও প্রোফাইল তথ্য যোগ করুন */}

      {/* userEmail থাকলে UserPaymentHistory কম্পোনেন্ট রেন্ডার করুন */}
      {userEmail ? (
        <UserPaymentHistory userEmail={userEmail} />
      ) : (
        <p>পেমেন্ট হিস্টরি দেখার জন্য লগইন করা প্রয়োজন বা ইমেল উপলব্ধ নয়।</p>
      )}
    </div>
  );
};

export default Profile;