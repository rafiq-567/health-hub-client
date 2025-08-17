import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const SellerHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["seller-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/by-seller?email=${user.email}`);
      return res.data;
    },
  });

  const paidTotal = payments
    .filter(payment => payment.status === "paid")
    .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

  const pendingTotal = payments
    .filter(payment => payment.status === "pending")
    .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
      {isLoading ? (
        <p>Loading payment data...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Paid Sales</h3>
            <p className="text-xl text-green-600 font-bold">${paidTotal.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Pending Sales</h3>
            <p className="text-xl text-yellow-600 font-bold">${pendingTotal.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerHome;
