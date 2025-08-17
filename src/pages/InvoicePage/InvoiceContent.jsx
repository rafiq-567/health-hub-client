import React, { forwardRef } from 'react';
import HealthHubExpressLogo from '../shared/HealthHubExpressLogo/HealthHubExpressLogo';

const InvoiceContent = forwardRef(({ user, transactionId, amount, date, cartItems }, ref) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return (
    <div ref={ref} className="bg-white p-6 shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b pb-4">
        <div className="mb-4 md:mb-0">
          <HealthHubExpressLogo className="h-16" />
          <p className="text-gray-600 mt-2">123 Medical Street, Health City</p>
        </div>
        <div className="text-left md:text-right">
          <h1 className="text-2xl font-bold text-blue-600">Payment Invoice</h1>
          <p className="text-gray-600">Invoice #: {transactionId}</p>
          <p className="text-gray-600">Date: {new Date(date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-2">Customer Information</h2>
          <p><strong>Name:</strong> {user?.displayName || 'Guest'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-2">Payment Details</h2>
          <p><strong>Amount:</strong> ${amount?.toFixed(2)}</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
      </div>

      {/* Items */}
      {cartItems?.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border">Item</th>
                  <th className="text-right p-3 border">Price</th>
                  <th className="text-right p-3 border">Qty</th>
                  <th className="text-right p-3 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 border">{item.name}</td>
                    <td className="text-right p-3 border">${item.price.toFixed(2)}</td>
                    <td className="text-right p-3 border">{item.quantity}</td>
                    <td className="text-right p-3 border">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan="3" className="text-right p-3 border">Subtotal</td>
                  <td className="text-right p-3 border">${subtotal.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan="3" className="text-right p-3 border">Total</td>
                  <td className="text-right p-3 border">${amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center py-4">No items in this order</p>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
        <p>Thank you for choosing HealthHubExpress!</p>
        <p>Contact: support@healthhubexpress.com | Phone: (123) 456-7890</p>
      </div>
    </div>
  );
});

export default InvoiceContent;
