

"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ExpertCard from "../shared/skeletonLoading/ExpertCard";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ExpertChoice = ({ className }) => {
  const router = useRouter();
  
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, { id: "expert-choice" });
    }
  }, [productsError]);

  const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

  return (
    <Container className={className ? className : ""}>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">
          Experts Choice. <span className="">Most Favorites</span>
        </h1>

         <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {productsLoading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <ExpertCard />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {products?.slice(-8)?.map((product, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="flex flex-col gap-y-4 border p-4 rounded-lg hover:border-black transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/product?product_id=${product?._id}&product_title=${product.title
                        .replace(/ /g, "-")
                        .toLowerCase()}`
                    )
                  }
                >
                  <div className="grid grid-cols-12 grid-rows-6 gap-2 h-[200px]">
                    {product.gallery.map((thumbnail, idx) => (
                      <Image
                        key={idx}
                        src={thumbnail?.url}
                        alt={thumbnail?.public_id}
                        width={296}
                        height={200}
                        className={`${
                          product.gallery.length === 1
                            ? "col-span-12 row-span-6"
                            : product.gallery.length === 2
                            ? "col-span-12 row-span-3"
                            : product.gallery.length === 3
                            ? idx === 0
                              ? "col-span-12 row-span-3"
                              : "col-span-6 row-span-3"
                            : product.gallery.length === 4
                            ? "col-span-6 row-span-3"
                            : idx <= 1
                            ? "col-span-6 row-span-3"
                            : "col-span-4 row-span-3"
                        } h-full w-full object-cover rounded`}
                      />
                    ))}
                  </div>

                  <article className="flex flex-col gap-y-3.5">
                    <div className="flex flex-col gap-y-4">
                      <h2 className="line-clamp-1">{product?.title}</h2>
                      <div className="flex flex-row items-end justify-between">
                        <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                          <span className="text-green-500 !leading-none">
                            ₹{product?.price}.00
                          </span>
                        </span>
                        <span className="flex flex-row items-center gap-x-0.5">
                          <AiFillStar className="text-[#ffc242]" />
                          <span className="text-sm">
                            {product?.reviews?.length}
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
        {!productsLoading && products?.length === 0 && (
          <p className="text-sm">Oops! No products found!</p>
        )}
      </section>
    </Container>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}

export default ExpertChoice;
