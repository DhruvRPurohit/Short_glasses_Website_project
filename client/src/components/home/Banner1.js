
import React from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import Container from "../shared/Container";
import { useRouter } from "next/navigation";

const Banner1 = () => {
  const router = useRouter();

  return (
    <Container>
      <div
        className="bg-yellow-50 h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 pt-8 pb-0"
       
      >
        <Image
          src="/assets/home/banner/Photo_bg.png"
          alt="model"
          height={872}
          width={500}
          className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
        />
        <article className="flex flex-col justify-start items-end order-1 px-8">
          <div className="flex flex-col gap-y-4 max-w-lg z-20 mr-auto">
            
            <p className="flex flex-row gap-x-0.5 items-center text-md lg:text-lg text-black">
              Amit Doshi, from Ahmedabad, India, has collected over 550 shot glasses from 95 countries and independent territories. His hobby, which began in 1997 during a visit to the USA, has earned recognition from the Golden Book of World Records and other bodies.
              <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
            </p>
              
            <button
              className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
              onClick={() => router.push("/about")}
            >
              Know More 
            </button>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default Banner1;
