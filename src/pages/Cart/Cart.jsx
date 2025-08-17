import { useNavigate } from 'react-router';
import { useCart } from '../../contexts/CartContext';
import UseAuth from '../../hooks/UseAuth';
import { Helmet } from 'react-helmet'; // <--- NEW: Import Helmet

const Cart = () => {
  const { user } = UseAuth();
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Check if the current user's product is in the cart
  // This assumes each item in the cart has a `sellerEmail` property
  const isOwnProductInCart = cart.some(item => item.sellerEmail === user?.email);

  // Calculate the total price of items in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);



  // Explicitly convert cart.length to a string for Helmet
  const cartTitle = `HealthHub Express - Your Cart (${String(cart.length)} items)`; // <-- FIX IS HERE

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* <Helmet> component for dynamic title */}
      <Helmet>
        <title>{cartTitle}</title> {/* Use the pre-formatted string */}
        <meta name="description" content="Review and manage items in your HealthHub Express shopping cart before checkout." />
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Image</th>
                <th className="p-2">Medicine</th>
                <th className="p-2">Company</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.company}</td>
                  <td className="p-2">${item.price.toFixed(2)}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity) && newQuantity >= 1) {
                          updateQuantity(item._id, newQuantity);
                        }
                      }}
                      className="w-16 p-1 border rounded"
                    />
                  </td>
                  <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Clear Cart
            </button>
            <div>
              <p className="text-xl font-semibold mb-2">Total: ${total.toFixed(2)}</p>

              <button
                disabled={!user || isOwnProductInCart}
                onClick={() => navigate('/checkout')}
                className={
                  (!user || isOwnProductInCart)
                    ? 'bg-gray-400 text-white px-5 py-2 rounded cursor-not-allowed'
                    : 'bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700'
                }
              >
                {!user
                  ? 'Login to Proceed'
                  : isOwnProductInCart
                    ? 'Cannot Purchase Your Own Product'
                    : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;