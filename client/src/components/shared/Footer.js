/**
 * Title: Write a program using JavaScript on Footer
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, October 2023
 */

"use client";

import React from "react";
import Container from "./Container";
import { IoAccessibilityOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();

  const sitemaps = [
    // {
    //   name: "Features",
    //   paths: [
    //     {
    //       name: "Cool stuff",
    //       path: "/",
    //     },
    //     {
    //       name: "Random feature",
    //       path: "/",
    //     },
    //     {
    //       name: "Team feature",
    //       path: "/",
    //     },
    //     {
    //       name: "Stuff for developers",
    //       path: "/",
    //     },
    //     {
    //       name: "Another one",
    //       path: "/",
    //     },
    //     {
    //       name: "Last time",
    //       path: "/",
    //     },
    //   ],
    // },
    // {
    //   name: "Resources",
    //   paths: [
    //     {
    //       name: "Resource",
    //       path: "/",
    //     },
    //     {
    //       name: "Resource name",
    //       path: "/",
    //     },
    //     {
    //       name: "Another resource",
    //       path: "/",
    //     },
    //     {
    //       name: "Final resource",
    //       path: "/",
    //     },
    //   ],
    // },
    // {
    //   name: "About",
    //   paths: [
    //     {
    //       name: "Team",
    //       path: "/",
    //     },
    //     {
    //       name: "Locations",
    //       path: "/",
    //     },
    //     {
    //       name: "Privacy",
    //       path: "/",
    //     },
    //     {
    //       name: "Terms",
    //       path: "/",
    //     },
    //   ],
    // },
    // {
    //   name: "Contact",
    //   paths: [
    //     {
    //       name: "Help",
    //       path: "/",
    //     },
    //     {
    //       name: "Sales",
    //       path: "/",
    //     },
    //     {
    //       name: "Advertise",
    //       path: "/",
    //     },
    //   ],
    // },
    {
      name: "Legal",
      paths: [
        {
          name: "Terms of Services",
          path: "/",
        },
        {
          name: "Privacy & Policy",
          path: "/",
        },
      ],
    },
    {
      name: "Stay Connected",
      paths: [
        {
          name: "Facebook",
          path: "",
        },
        {
          name: "LinkedIn",
          path: "",
        },
        {
          name: "GitHub",
          path: "https://github.com/DhruvRPurohit",
        },
      ],
    },
  ];

  return (
    <footer className="footer-1 bg-gray-100 py-6 sm:py-12 m-6 p-8 rounded-xl">
      <div className="container mx-auto px-5 flex flex-col gap-y-10">
        
        {/* Top section: Company Info + Sitemap links */}
        <div className="flex flex-wrap justify-between w-full gap-6">
          
          {/* Company Info (left side) */}
          <div className="w-full sm:w-[40%] text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Chattary Ajwan Infotech Pvt. Ltd.
            </h2>
            <p className="text-gray-600 text-md">
                Niraman Complex, Navrangpura, Ahemeddabad, Gujrarat 380009
            </p>
          </div>

          {/* Sitemap Sections (right side) */}
          <div className="w-full sm:w-[50%] flex flex-wrap justify-start sm:justify-end gap-12">
            {sitemaps.map((section, idx) => (
              <div key={idx} className="w-40 text-center sm:text-left">
                <h2 className="text-lg font-semibold mb-3">{section.name}</h2>
                <ul className="space-y-2">
                  {section.paths.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.path}
                        className="text-gray-700 hover:text-gray-900 transition hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Divider + Bottom Text */}
        <hr className="my-1" />
        <p className="text-center text-sm text-gray-500">
          &copy; {year} Chattary Ajwan Infotech Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>

  );
};

export default Footer;
