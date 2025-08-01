"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { useSignInMutation } from "@/services/auth/authApi";
import { toast } from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [signin, { isLoading, data, error }] = useSignInMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing in...", { id: "signin" });
    }

    if (data) {
      toast.success(data?.description, { id: "signin" });
      localStorage.setItem("accessToken", data?.accessToken);

      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "signin" });
    }
  }, [isLoading, data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();
    signin({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    e.target.reset();
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <hr className="flex-1 border-gray-300" />
          <div className="text-lg font-semibold text-gray-800">Sign In</div>
          <hr className="flex-1 border-gray-300" />
        </div>

        <form
          action=""
          className="w-full flex flex-col gap-y-5"
          onSubmit={handleSignin}
        >
          <label htmlFor="email" className="flex flex-col gap-y-1 text-sm text-gray-700">
            <span>Enter Your Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="i.e. example@gmail.com"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            />
          </label>

          <label htmlFor="password" className="flex flex-col gap-y-1 text-sm text-gray-700">
            <span>Enter Your Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="i.e. Admin@123"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 font-medium border border-black rounded-lg bg-black hover:bg-black/90 text-white transition-colors duration-200 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
          >
            {isLoading ? <Spinner /> : "Sign In"}
          </button>
        </form>

        <div className="flex justify-center items-center gap-x-2 text-sm text-gray-600">
          <Link href="/auth/signup" className="hover:underline hover:text-black transition">
            Sign Up
          </Link>
          <span className="h-4 border-l border-gray-300" />
          <Link href="/auth/forgot-password" className="hover:underline hover:text-black transition">
            Forgot Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;
