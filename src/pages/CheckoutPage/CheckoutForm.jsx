import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { ClipLoader } from 'react-spinners';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ total }) => {
  const {user} = UseAuth()
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCart();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // clientSecret ফেচ করার জন্য useEffect ব্যবহার করুন
  useEffect(() => {
    if (total > 0) { // মোট মূল্য 0 এর বেশি হলেই পেমেন্ট ইনটেন্ট তৈরি করার অনুরোধ পাঠান
      fetch('https://server-mauve-seven.vercel.app/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // যদি আপনার ব্যাকএন্ড অথেন্টিকেশন টোকেন চায়, তবে এখানে যোগ করুন:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: total }), // 'amount' হিসেবে মোট মূল্য পাঠান
      })
        .then(res => res.json())
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError(data.message || 'ক্লায়েন্ট সিক্রেট পেতে ব্যর্থ হয়েছে।');
          }
        })
        .catch(err => {
          console.error("Error fetching client secret:", err);
          setError('পেমেন্ট শুরু করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
        });
    }
  }, [total]); // যখন total পরিবর্তিত হবে, তখন আবার চালান

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) { // clientSecret উপলব্ধ কিনা তা পরীক্ষা করুন
      setError('পেমেন্ট সিস্টেম লোড হয়নি অথবা ক্লায়েন্ট সিক্রেট উপলব্ধ নয়।');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('কার্ড তথ্য পূরণ করুন।');
      return;
    }

    setProcessing(true);
    setError(''); // পূর্ববর্তী এরর পরিষ্কার করুন

    const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
    //   import.meta.env.VITE_payment_key,
    //   {
    //     payment_method: paymentMethod.id,
    //   }
    // );

    // ধাপ ২: পেমেন্ট নিশ্চিত করুন clientSecret ব্যবহার করে
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret, // এখানে আপনার ব্যাকএন্ড থেকে পাওয়া clientSecret ব্যবহার করুন
      {
        payment_method: {
          card: card, // পেমেন্ট মেথড আইডি নয়, কার্ড এলিমেন্ট অবজেক্ট দিন
          // বিলিং বিবরণ যোগ করতে পারেন, যেমন:
          billing_details: {
              email: user?.email, // যদি user হুক ব্যবহার করেন
              name: user?.displayName,
          },
        },
      }
    );

    setProcessing(false); // প্রসেসিং শেষ

    // if (confirmError) {
    //   setError(confirmError.message);
    //   setProcessing(false);
    // } else if (paymentIntent.status === 'succeeded') {
    //   setError('');
    //   clearCart(); // Clear cart after successful payment

    //   // Save payment info to DB (optional)
    //   await fetch('https://server-mauve-seven.vercel.app/payments', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       amount: total,
    //       transactionId: paymentIntent.id,
    //       cartItems: cart,
    //       status: 'paid',
    //     }),
    //   });

    //   navigate('/invoice', {
    //     state: {
    //       transactionId: paymentIntent.id,
    //       amount: total,
    //       date: new Date().toLocaleDateString(),
    //     },
    //   });
    // }

    if (confirmError) {
      console.error('[কনফার্ম এরর]', confirmError);
      setError(confirmError.message);
      Swal.fire({
        icon: 'error',
        title: 'পেমেন্ট ব্যর্থ!',
        text: confirmError.message,
      });
    } else if (paymentIntent.status === 'succeeded') {
      setError('');
      clearCart(); // সফল পেমেন্টের পর কার্ট পরিষ্কার করুন

      // পেমেন্টের তথ্য ডেটাবেসে সংরক্ষণ করুন
      await fetch('https://server-mauve-seven.vercel.app/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          transactionId: paymentIntent.id,
          cartItems: cart,
          status: 'paid',
          buyerEmail: user?.email, // ক্রেতার ইমেল যোগ করুন
          // অন্যান্য প্রাসঙ্গিক তথ্য যোগ করুন যেমন date, sellerEmail (যদি কার্ট আইটেম থেকে পাওয়া যায়)
        }),
      });

      Swal.fire({
        icon: 'success',
        title: 'পেমেন্ট সফল!',
        text: `আপনার লেনদেন আইডি: ${paymentIntent.id}`,
      });

      navigate('/invoice', {
        state: {
          transactionId: paymentIntent.id,
          amount: total,
          date: new Date().toLocaleDateString(),
          // অন্যান্য ইনভয়েস বিবরণ
        },
      });
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-4 rounded mb-4" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        
        // নিশ্চিত করুন যে clientSecret লোড হয়েছে
        disabled={!user || !stripe || !elements || !clientSecret || processing || total <= 0}
      >
        {user ? '':'login  to  pay'}
        {processing ? <ClipLoader /> : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
