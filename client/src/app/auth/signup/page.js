
"use client";

import Trash from "@/components/icons/Trash";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import { useSignUpMutation } from "@/services/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { optimizeFonts } from "../../../../next.config";
import useClickOutside from './useClickOutside';


const Signup = () => {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [signup, { isLoading, data, error }] = useSignUpMutation();
  const [countries,setCountries]=useState([])
  const [code ,setCode]=useState()
  const [image,setImage]=useState("")
  const [number,setNumber]=useState("") 
  const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

 

  useEffect(() => {
    
    if (isLoading) {
      toast.loading("Signing up...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });
      
      // open new tab
      setTimeout(() => {
        window.open("/auth/signin", "_self");
      }, 1000);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }

    const fetchCountryCodes = async () => {
    try {
      const res = await fetch(
       "https://restcountries.com/v3.1/all?fields=name,idd,flags"
      );
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      const parsed = data
        .filter(c => c.idd?.root)
        .map(c => ({
          name: c.name.common,
          code: `${c.idd.root}${c.idd.suffixes?.[0] || ''}`,
          flag: c.flags?.png,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(parsed);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    if (!selected && countries.length > 0) {
      const defaultCountry = countries.find((c) => c.name.toLowerCase() === "india");
      if (defaultCountry) {
        setSelected(defaultCountry);
      }
    }
  };

  fetchCountryCodes();
  }, [isLoading, data, error, router ,countries, selected]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
     if (countries.length > 0 && !selected) {
      setSelected(countries[0]);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);

    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    if (!e.target.password.value.match(passwordRegex)) {
      alert(
        "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
      );
      return;
    }
    
    // Phone number validation regex
    const fullPhone = `${selected.code} ${number}`; // Combine selected code and typed digits
      const phoneRegex = /^\+\d{1,4}\s\d{6,14}$/;

      if (!phoneRegex.test(fullPhone)) {
        alert("Enter a valid international phone number (e.g., +44 7123456789).");
        return;
      }

    formData.append("phone", fullPhone)
    formData.append("password", e.target.password.value);

    signup(formData);

   
    e.target.reset();
    setAvatarPreview(null);
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-2xl shadow-2xl">
        <div className="flex  items-center gap-x-3">
          <hr className="flex-1" />
          <div className="text-lg font-semibold text-gray-800">Sign Up</div>
          <hr className="flex-1" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSignup}
        >
          <label
            htmlFor="avatar"
            className="flex flex-col gap-y-1 w-fit mx-auto items-center"
          >
            <div
              className={
                "h-[100px] w-[100px] rounded transition-colors flex flex-row justify-center items-center relative" +
                " " +
                (avatarPreview
                  ? ""
                  : "border-2 border-dashed hover:border-black")
              }
            >
              {avatarPreview ? (
                <div className="relative">
                  <Image
                    src={avatarPreview}
                    alt="avatar"
                    height={100}
                    width={100}
                    className="rounded h-[100px] w-[100px] object-center"
                  />
                  <button
                    className="absolute bottom-0 -right-10 p-1 rounded bg-red-500 text-white shadow-2xl"
                    onClick={() => setAvatarPreview(null)}
                  >
                    <Trash />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-xs flex flex-col justify-center items-center gap-y-2 text-center">
                    <Upload />
                    Add Avatar <br /> 300x300
                  </span>

                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    title="Dimension: 300x300"
                    accept=".jpg, .jpeg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleAvatarChange}
                    required
                  />
                </>
              )}
            </div>
          </label>
          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Name*</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="i.e. John Doe"
              className=""
              required
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Email*</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="i.e. example@gmail.com"
              className=""
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Password*</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="i.e. Admin@123"
              className=""
              required
            />
          </label>
          <label htmlFor="phone" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Phone Number*</span>
            <div className="flex gap-x-3 justify-center items-center">
              {code &&
                <Image
                  src={image}
                  height={24} width={32} 
                  alt="select"
                  className="w-8 h-6 object-center"
                />
              }
              {/* <select
                name="countryCode"
                id="countryCode"
                className="px-2 py-2 w-[100px] border rounded-md text-sm"
                required
                 onChange={(e) => {
                  const selected = countries.find(c => c.code === e.target.value);
                  if (selected) {
                    setCode(selected.code);
                    setImage(selected.flag)
                  }
                }}
              >
                {
                  countries.map((i,index)=>(
                    <option key={index} value={i.code}>
                      {i.name.slice(0,3)} 

                    </option>
                  ))
                }
              </select> */}
              <div className="relative w-[120px] "  ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between w-full border rounded-md px-2 py-1 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <Image src={selected?.flag} alt={selected?.name} height={24} width={32} className="w-8 h-6 object-center object-cover" />
                    <span className="text-sm">{ selected && selected.name? `${selected.name.slice(0, 3)} (${selected.code})` : ''} </span>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute bottom-full mb-2 z-10 w-[220px] bg-white border rounded-md shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-2"
>
                    {countries.map((country, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelected(country);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm whitespace-nowrap"
                      >
                        <Image src={country.flag} alt={country.name} height={24} width={32}  className="w-6 h-4 object-cover rounded-sm" />
                        <span>{country.name} ({country.code})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Contact Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="flex-1 px-3 w-[150px] py-1 border rounded-md text-sm"
                  required 
                />
              </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
        <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
          <Link href="/auth/signin" className="hover:underline">
            Sign In
          </Link>
          <span className="h-4 border-l" />
          <Link href="/auth/forgot-password" className="hover:underline">
            Forgot Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
