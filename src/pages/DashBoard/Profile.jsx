// // Profile.jsx
// import UseAuth from '../../hooks/UseAuth';
// import UserPaymentHistory from '../../pages/DashBoard/UserDashboard/UserPaymentHistory';
// import LoadingSpinner from '../../pages/LoadingSpinner'; // LoadingSpinner ইম্পোর্ট করুন

// const Profile = () => {
//   const { user, loading } = UseAuth(); 

//   if (loading) {
//     return <LoadingSpinner />; 
//   }

//   // user অবজেক্ট লোড হওয়ার পর, তার email ব্যবহার করুন
//   // currentUserEmail এর প্রয়োজন নেই, সরাসরি user?.email ব্যবহার করতে পারেন
//   const userEmail = user?.email; 
// console.log(userEmail)
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Profile</h1>
//       {/* যদি user.email থাকে, তবে দেখান, অন্যথায় কিছু বার্তা */}
//       <p>Email: {userEmail || 'There is no valid email'}</p> 
//       <p>Phone Number: {userEmail? 'number':'No phone number'}</p> 
//       {/* এখানে আরও প্রোফাইল তথ্য যোগ করুন */}

//       {/* userEmail থাকলে UserPaymentHistory কম্পোনেন্ট রেন্ডার করুন */}
//       {userEmail ? (
//         <UserPaymentHistory userEmail={userEmail} />
//       ) : (
//         <p>পেমেন্ট হিস্টরি দেখার জন্য লগইন করা প্রয়োজন বা ইমেল উপলব্ধ নয়।</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import UseAuth from '../../hooks/UseAuth';
import UserPaymentHistory from '../../pages/DashBoard/UserDashboard/UserPaymentHistory';
import LoadingSpinner from '../../pages/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Profile = () => {
  const { user, loading: authLoading } = UseAuth();

  // 1. Use useQuery to fetch the full user profile from your database
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery({
    // The query key makes sure the query is unique for each user
    queryKey: ['dbUser', user?.email],

    // The queryFn is the function that actually fetches the data
    queryFn: async () => {
      if (!user?.email) {
        // If there's no email from UseAuth, we don't need to fetch
        return null;
      }
      try {
        // We use the email to make a request to your backend
        const res = await axios.get(`https://server-two-rosy-34.vercel.app/user/email/${user.email}`);
        return res.data;
      } catch (error) {
        console.error("Failed to fetch user data from DB:", error);
        throw new Error("Could not load user data.");
      }
    },
    // This 'enabled' option makes sure the query only runs when a user email is available
    enabled: !!user?.email,
  });

  // Combine both loading states for a smooth experience
  if (authLoading || isUserLoading) {
    return <LoadingSpinner />;
  }

  if (isUserError || !user) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Could not load user profile. Please try again later.</p>
      </div>
    );
  }

  // Check if userData is available before trying to display it
  if (!userData) {
    return (
      <div className="p-6 text-center">
        <p>No user data found. You might need to re-login.</p>
      </div>
    );
  }

  return (
    <div className="p-6 dark:text-black">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-2">
        {/* We now use userData from the database to show details */}
        <img
          src={userData.photoURL}
          alt={`${userData.name}'s profile picture`}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-md"
        />
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Phone Number: {userData.number || 'No phone number available'}</p>
        <p>Address: {userData.address}</p>
        <p>created_at : {userData.created_at}</p>
        <p>Role: {userData.role}</p>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Payment History</h2>
      <UserPaymentHistory userEmail={userData.email} />
    </div>
  );
};

export default Profile;