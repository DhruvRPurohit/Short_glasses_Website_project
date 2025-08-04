"use client";

import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const Banner3 = ({ className }) => {
  const router = useRouter();

  return (
    <Container className={className ? className : ""}>
      <div
        className="bg-gray-50 h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 p-8"
        // style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
      >
        <Image
          src="/assets/home/banner/shots_cheers.png"
          alt="model"
          height={872}
          width={600}
          className="lg:absolute bottom-0 right-0 order-2"
        />
        <article className="flex flex-col justify-start items-end order-1">
          <div className="flex flex-col gap-y-4 max-w-lg z-50 lg:mr-auto lg:mr-0 mr-auto">
            <h1 className="md:text-6xl text-4xl"> Cheers to Free Rewards</h1>
            <p className="flex flex-row gap-x-0.5 items-center text-lg text-slate-500">
              Get more than just a glass — earn bonuses with every buy.
            </p>
            <motion.button
              whileHover={{scale:1.10}}
              whileTap={{scale:0.90}}
              className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
              onClick={() => router.push("/about")}
            >
              Discover More
            </motion.button>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default Banner3;
