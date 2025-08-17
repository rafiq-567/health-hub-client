// import { useCart } from '../../contexts/CartContext/CartProvider';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../../contexts/CartContext';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key); // Add your Stripe public key to .env

const CheckoutPage = () => {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState('');

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (totalAmount > 0) {
      fetch('https://server-mauve-seven.vercel.app/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }
  }, [totalAmount]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm total={totalAmount} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
