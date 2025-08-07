"use client"
import React from 'react'
import Image from "next/image";
import Header from "../../components/shared/header/Header";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};


const About = () => {
  return (
    <>
    <Header/>
    <div className='h-auto w-full p-8'>
      {/*Section 1  */}
      <div className="flex flex-col lg:flex-row items-center justify-center bg-yellow-50 p-6 md:p-12 gap-10 ">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative h-[350px] w-[350px] rounded-full overflow-hidden border-4 border-yellow-200 ring-2 ring-offset-2 ring-yellow-100 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-2 order-1 lg:order-2"
        >
          <Image 
            src="/assets/home/banner/Photo_bg.png"
            alt="model"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>

        <motion.div className="max-w-lg px-6 md:px-0 order-2 lg:order-1"
           variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2    
           variants={textVariant}
           className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left mb-4"
          >
            Shot Glass Collector: Amit Doshi
          </motion.h2>
          <motion.p variants={textVariant} className="text-gray-800 text-lg leading-relaxed">
            Amit Doshi, from Ahmedabad, India, has a collection of more than 550 shot glasses from 95 countries and independent territories.
          </motion.p>
          <br />
          <motion.p variants={textVariant} className="text-gray-800 text-lg leading-relaxed">
            A hobby which started in 1997 during his visit to the USA has earned recognition from the Golden Book of World Records and other bodies.
          </motion.p>
        </motion.div>
      </div>

    </div>

    {/* Section 2 */}
    <div className='h-auto w-full p-8'>
      
      <div className="flex flex-col lg:flex-row items-center justify-center bg-yellow-50 p-6 md:p-12 gap-10 "
      >
        <motion.div 
          initial={{ opacity: 0, y:0 , scale:0 , rotate:-15}}
          whileInView={{ opacity: 1, scale:1 ,rotate:1}}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}

          className="relative h-[350px] w-[350px] rounded-full overflow-hidden border-4 border-yellow-200 ring-2 ring-offset-2 ring-yellow-100 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-2 "
        >
            <Image 
              src="/assets/home/banner/Photo_bg2.png"
              alt="model"
              fill
              className="object-center object-cover rounded-full"
            />
        
        </motion.div>
        
         <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-lg px-6 md:px-0"
         >
          
          <p className="text-gray-800 text-lg leading-relaxed">
            What Gives the collection uninqueness is the diversity in the design of the shot glasses as well as the story behind them.
          </p>
          <br />
         
        </motion.div>

      </div>
    </div>
    </>
  )
}

export default About