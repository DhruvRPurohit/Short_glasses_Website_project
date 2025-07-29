

"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const NewArrivals = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, {
        id: "new-arrivals",
      });
    }
  }, [productsError]);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">
          New Arrivals. <span className="">New Equipment</span>
        </h1>

        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {productsLoading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <ProductCard />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {products?.slice(0, 4)?.map((product, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card index={index} product={product} />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {!productsLoading && products?.length === 0 && (
          <p className="text-sm">No products found</p>
        )}
      </section>
    </Container>
  );
};

export default NewArrivals;
