// UserPaymentHistory.jsx
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth'; // <--- Ensure this import is correct

const UserPaymentHistory = () => { // <--- userEmail prop has been removed
    // Directly get user and loading state from UseAuth
    const { user, loading: userAuthLoading } = UseAuth(); 
    const userEmail = user?.email; // <--- userEmail is now derived directly here

    // IMPORTANT: Log what you get from UseAuth
    console.log("UserPaymentHistory Debug: User from UseAuth:", user);
    console.log("UserPaymentHistory Debug: userAuthLoading state:", userAuthLoading);
    console.log("UserPaymentHistory Debug: userEmail derived internally:", userEmail);
    
    // Handle loading state for UseAuth itself
    if (userAuthLoading) {
        return <p>User authentication data is loading...</p>; // Loading message for auth state
    }

    // If user is not logged in or email is not available
    if (!userEmail) {
        console.log("UserPaymentHistory Debug: userEmail undefined after auth load. Not fetching payments.");
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">My Payment History</h2>
                <p>Your email is required to view payment history. Please log in.</p>
            </div>
        );
    }

    // Now, use useQuery with the internally derived userEmail
    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['userPayments', userEmail], // userEmail will be defined if we reach here
        enabled: !!userEmail, // Still good practice, but now mostly redundant if we've passed the !userEmail check above
        queryFn: async () => {
            const url = `https://server-mauve-seven.vercel.app/payments/user?email=${userEmail}`;
            console.log("UserPaymentHistory Debug: Attempting to fetch from URL:", url);

            try {
                const res = await fetch(url);

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("UserPaymentHistory Error: Network response NOT OK:", res.status, errorData);
                    throw new Error(errorData.message || 'Failed to fetch payments due to server error.');
                }
                const data = await res.json();
                console.log("UserPaymentHistory Debug: Fetched payments data:", data);
                return data;
            } catch (fetchError) {
                console.error("UserPaymentHistory Error: Fetch operation failed:", fetchError);
                throw fetchError;
            }
        }
    });

    if (isLoading) {
        console.log("UserPaymentHistory Debug: Payments data is loading...");
        return <p>Loading payment history...</p>; // Loading message for payment data fetch
    }

    if (isError) {
        console.error("UserPaymentHistory Debug: Error state detected:", error);
        return <p className="text-red-500">Error loading payment history: {error?.message || 'Unknown error'}</p>;
    }

    console.log("UserPaymentHistory Debug: Final payments data length:", payments.length);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Payment History</h2>
            {payments.length === 0 ? (
                <p>No payment history available.</p>
            ) : (
                <table className="w-full text-sm border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Medicine</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => (
                            <tr key={payment._id} className="border-t">
                                <td>{idx + 1}</td>
                                <td>{payment.transactionId || 'N/A'}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${payment.status === 'paid' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td>${payment.amount?.toFixed(2)}</td>
                                <td>
                                    {payment.cartItems && payment.cartItems.length > 0
                                        ? payment.cartItems.map(item => item.title).join(', ')
                                        : payment.medicineName || '-'}
                                </td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPaymentHistory;