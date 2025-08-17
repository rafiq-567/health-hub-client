import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useLocation } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import HealthHubExpressLogo from '../shared/HealthHubExpressLogo/HealthHubExpressLogo';
import InvoiceContent from './InvoiceContent';

const InvoicePage = () => {
  const { user } = UseAuth();
  const location = useLocation();
  const { transactionId, amount, date, cartItems } = location.state || {};
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `HealthHub_Invoice_${transactionId}`,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
  });

  if (!transactionId) {
    return (
      <div className="p-6 text-center">
        <HealthHubExpressLogo />
        <p className="mt-4 text-red-500">No payment data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <InvoiceContent
        ref={componentRef}
        user={user}
        transactionId={transactionId}
        amount={amount}
        date={date}
        cartItems={cartItems}
      />

      <div className="mt-6 text-center no-print">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md shadow hover:bg-blue-700"
        >
          Print / Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
