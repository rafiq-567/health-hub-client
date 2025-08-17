import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';


const PaymentHistory = () => {
    const { user } = UseAuth();
    const sellerEmail = user?.email;

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', sellerEmail],
        enabled: !!sellerEmail,
        queryFn: async () => {
            const res = await fetch(`https://server-mauve-seven.vercel.app/payments/by-seller?email=${sellerEmail}`);
            return res.json();
        }
    });

    if (isLoading) return <p>Loading payment history...</p>;

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Payment History</h2>
            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th>User Email</th>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id} className="border-t">
                            <td>{payment.buyerEmail}</td>
                            <td>{payment.cartItems[0].title}</td>
                            <td>{payment.cartItems[0].quantity}</td>
                            <td>${payment.amount}</td>
                            <td className={payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                                {payment.status || 'pending'}
                            </td>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
