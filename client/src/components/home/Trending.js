"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Trending = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const router = useRouter();
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description || "Something went wrong", {
        id: "trending",
      });
    }
  }, [productsError]);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-4xl">
            What&lsquo;s <span className="">Trending Now</span>
          </h1>
          <p className="text-base">
            Discover the most trending products in Canim.
          </p>
        </div>
        <div className="flex flex-col gap-y-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
            {productsLoading ? (
              <>
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <ProductCard />
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {products?.slice(-8)?.map((product, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                  >
                    <Card product={product} />
                  </motion.div>
                ))}
              </>
            )}
          </div>
          <motion.button
            whileHover={{scale:1.10}}
            whileTap={{scale:0.90}}
            className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mx-auto flex flex-row gap-x-2 items-center"
            onClick={() => router.push("/products")}
          >
            Show Me More
          </motion.button>
        </div>
        {!productsLoading && products?.length === 0 && (
          <p className="text-sm">Oops! No products found!</p>
        )}
      </section>
    </Container>
  );
};

export default Trending;
