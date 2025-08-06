"use client";

import Dashboard from "@/components/shared/layouts/Dashboard";
import Inform from "@/components/icons/Inform";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "@/components/shared/Card";

const Page = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);

  // Initialize from Redux
  useEffect(() => {
    if (user?.cart?.length > 0) {
      setCartItems(user.cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })));
    }
  }, [user?.cart]);

  console.log(cartItems)
  // Quantity change handler
  const handleQuantityChange = (cartItemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <Dashboard>
      `{cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-full p-6">
          <p className="text-sm flex items-center gap-2 text-gray-500">
            <Inform /> No Products in Cart List!
          </p>
        </div>
      ) : (
        <>
        <section className="w-full px-2 py-2 flex items-center justify-center">
          {/* Product Cards Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map(({ product, quantity, _id }) => (
              <Card
                key={_id}
                product={product}
                quantity={quantity}
                cartItemId={_id}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

         
        </section>
            {/* Cart Summary */}
           
          <div className="w-full max-w-md bg-gray-50 p-3 border rounded-lg mt-10 mx-auto shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Cart Summary
            </h2>

            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex justify-center">
                <span>Total Items:</span>
                <span className="font-medium">{totalItems}</span>
              </p>
              <p className="flex justify-center">
                <span>Grand Total:</span>
                <span className="font-semibold text-green-600">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </p>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </Dashboard>

  );
};

export default Page;
