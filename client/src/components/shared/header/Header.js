"use client";

import React from "react";
import Container from "../Container";
import Image from "next/image";
import Categories from "./Categories";
import Auth from "./Auth";
import Dashboard from "@/components/icons/Dashboard";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation'; // ✅ For App Router


const Header = () => {
const user = useSelector((state) => state?.auth?.user);
 const router = useRouter();
  return (
    <Container className="">
      <nav className="rounded-xl p-1 md:p-4 flex flex-row  md:justify-between justify-center gap-6 ">
        <div className="flex flex-row gap-x-2 md:gap-x-4 items-center relative">
          {/* <Image
            src="/logo.png"
            alt="logo"
            width={141}
            height={40}
            className="h-[40px] object-contain md:block hidden cursor-pointer"
            onClick={() => window.open("/", "_self")}
          /> */}
            {/* Logo */}
            <div className="relative bg-[url('https://www.transparenttextures.com/patterns/light-wood.png')] bg-[#fef9ec] bg-blend-overlay bg-cover px-4 md:px-6 py-1 rounded-l-2xl rounded-r-md  border border-yellow-300 overflow-hidden">
              <div className="absolute inset-0 rounded-l-2xl rounded-r-md pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-[200%] rotate-45 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
              </div>

              <div className="relative text-[#5b4a2f] z-10">
                <span className="block text-sm  whitespace-nowrap md:text-xl font-young font-semibold tracking-wide drop-shadow-sm">Amit Doshi</span>
              </div>

              {/* Flag-style triangle tip */}
              <div className="absolute top-1/2 -right-2.5 transform -translate-y-1/2 w-4 h-4 bg-yellow-200 rotate-45 shadow-sm border border-yellow-300" />
            </div>


        {/* <Categories /> */}
        </div>
        
        <div className="flex flex-row  md:gap-x-2 relative">
          <button className="px-1 md:px-4  rounded-xl text-xs md:text-sm  text-[#5b4a2f] bg-[#fef9ec] hover:bg-yellow-100 shadow-sm border border-yellow-300 transition duration-200"
              onClick={() => router.push("/about")}
          >
            About
          </button>
                      
          {user && Object?.keys(user)?.length > 0 && (
            <button
              className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
              onClick={() => window.open("/dashboard", "_self")}
            >
              <Dashboard className="h-6 w-6"/>
            </button>
          )}
          <SearchFilter />
          <Auth />
          <MyCart />
        </div>
      </nav>
    </Container>
  );
};

export default Header;
