import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Swal from 'sweetalert2'

const PaymentManagement = () => {
    const queryClient = useQueryClient()

    // Fetch all payment data
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axios.get('https://server-mauve-seven.vercel.app/payments')
            return res.data
        },
    })

    // Mutation to update payment status
    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axios.patch(`https://server-mauve-seven.vercel.app/payments/${id}`, {
                status: 'paid',
            })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['payments'])
            Swal.fire('Success!', 'Payment accepted.', 'success')
        },
    })

    const handleAcceptPayment = (id) => {
        mutation.mutate(id)
    }

    if (isLoading) return <p>Loading payments...</p>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">User Email</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => (
                            <tr key={payment._id}>
                                <td className="p-2 border text-center">{idx + 1}</td>
                                <td className="p-2 border">{payment.buyerEmail}</td>
                                <td className="p-2 border text-center">${payment.amount}</td>
                                <td className="p-2 border text-center">
                                    <span
                                        className={`px-2 py-1 rounded ${payment.status === 'paid'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-yellow-200 text-yellow-800'
                                            }`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="p-2 border text-center">
                                    {payment.status === 'pending' && (
                                        <button
                                            onClick={() => handleAcceptPayment(payment._id)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Accept Payment
                                        </button>
                                    )}
                                    {payment.status === 'paid' && <span>—</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentManagement
