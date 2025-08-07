"use client";

import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const Banner2 = ({ className }) => {
  const router = useRouter();

  return (
    <section className="mt-20">
      <Container className={className ? className : ""}>
        <div
          className="bg-yellow-50 h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 p-8"
        >
          <Image
            src="/assets/home/banner/zambia-2.png"
            alt="model"
            height={872}
            width={600}
            className="lg:absolute bottom-0 left-0 order-2"
          />
          <article className="flex flex-col justify-start items-end order-1">
            <div className="flex flex-col gap-y-4 max-w-lg z-50 lg:ml-auto lg:mr-0 mr-auto">
              <h1 className="md:text-6xl text-4xl">
                Unique Shot Glasses for Every Vibe
              </h1>
              <p className="flex flex-row gap-x-0.5 items-center text-lg text-slate-500">
                Style isn&apos;t just for what you wear. It&apos;s what you pour into.
              </p>

              <motion.button 
                whileHover={{ scale: 1.10 }}
                whileTap={{ scale: 0.90 }}
                className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
                onClick={() => router.push("/about") }
              >
                Discover More
              </motion.button>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default Banner2;
