import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = { paid: 0, pending: 0 }, isLoading, isError } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load stats.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Total Paid Sales</h3>
          <p className="text-xl text-green-600 font-bold">${stats.paid}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Pending Sales</h3>
          <p className="text-xl text-yellow-600 font-bold">${stats.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
