

"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "../icons/Bag";
import Spinner from "../shared/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";

const CartButton2 = ({ product }) => {
  const [qty, setQty] = useState(1);

  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError },
  ] = useAddToCartMutation();

  useEffect(() => {
    if (addingToCart) {
      toast.loading("Adding to cart...", { id: "addToCart" });
    }

    if (cartData) {
      toast.success(cartData?.description, { id: "addToCart" });
      setQty(1);
    }
    if (cartError?.data) {
      toast.error(cartError?.data?.description, { id: "addToCart" });
    }
  }, [addingToCart, cartData, cartError]);

  return (
    <section className="flex flex-row items-center gap-x-4">
      <button
        className="px-4 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
        disabled={qty === 0 || addingToCart}
        onClick={() => {
          addToCart({ product: product._id, quantity: qty });
        }}
      >
        {addingToCart ? (
          <Spinner />
        ) : (
          <>
            <Bag /> Add to Cart
          </>
        )}
      </button>
    </section>
  );
};

export default CartButton2;
