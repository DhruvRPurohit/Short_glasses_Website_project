"use client";

import Trash from "@/components/icons/Trash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, quantity, cartItemId, onQuantityChange }) => {
  if (!product) return null;

  const [removeFromCart, { isLoading }] = useDeleteFromCartMutation();
  const [qty, setQty] = useState(quantity);
  const unitPrice = product.price;
  const totalPrice = unitPrice * qty;

  const handleQtyChange = (delta) => {
    const newQty = qty + delta;
    if (newQty >= 1) {
      setQty(newQty);
      onQuantityChange(cartItemId, newQty); // 🟢 Inform parent (Page.jsx)
    }
  };

  const handleDelete = async () => {
    try {
      await removeFromCart(cartItemId).unwrap();
      toast.success("Item removed from cart");
      // Optional: You can notify parent here if needed
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="w-[300px] max-w-sm bg-white border rounded-xl shadow hover:shadow-md hover:border-black transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-[200px] w-full">
        <Image
          src={product?.thumbnail?.url}
          alt={product?.thumbnail?.public_id || "Product thumbnail"}
          width={350}
          height={200}
          className="w-[350px] h-[210px] object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4 h-full">
        <h3 className="text-lg font-semibold line-clamp-2 text-gray-800">
          {product?.title}
        </h3>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 border px-2 py-1 rounded-md">
            <button
              className="p-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              onClick={() => handleQtyChange(-1)}
              disabled={qty === 1}
            >
              <AiOutlineMinus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-medium text-sm">{qty}</span>
            <button
              className="p-1 border rounded text-gray-600 hover:bg-gray-100"
              onClick={() => handleQtyChange(1)}
            >
              <AiOutlinePlus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">₹{unitPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-green-600">
            Total: ₹{totalPrice.toFixed(2)}
          </p>
        </div>

        {product?.gallery?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product?.gallery?.map((img) => (
              <Image
                key={img._id}
                src={img.url}
                alt={img.public_id || "Gallery Image"}
                width={50}
                height={50}
                className="h-[50px] w-[50px] object-center rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Button */}
      <div>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-600 py-1 border hover:bg-red-800 border-red-900 p-0.5 rounded-xl text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
