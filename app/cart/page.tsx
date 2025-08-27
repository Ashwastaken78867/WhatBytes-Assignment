'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Lottie from 'lottie-react';
import emptyCartAnimation from '@/public/animations/empty-cart.json.json';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-64 h-64">
          <Lottie animationData={emptyCartAnimation} loop={true} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Your cart is currently empty</h2>
        <p className="text-gray-500 mt-2">Add items to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0 w-full sm:w-32 h-32 relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain rounded-md"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                <p className="text-gray-600 mt-1">Price: Rs {item.price}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition-colors duration-150"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 border-t pt-6">
        <p className="text-2xl font-semibold text-gray-800">Total: Rs {totalPrice}</p>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
