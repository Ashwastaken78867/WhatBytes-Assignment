"use client";

import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm sm:text-base">
        
        {/* Filters Section */}
        <div>
          <h3 className="font-bold mb-2">Filters</h3>
          <ul className="space-y-1">
            <li>All</li>
            <li>Electronics</li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="font-bold mb-2">About Us</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-1">
            <a href="#" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5 text-blue-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter">
              <TwitterIcon className="w-5 h-5 text-blue-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5 text-blue-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs sm:text-sm text-gray-300">
        © 2024 WhatBytes
      </div>
    </footer>
  );
};

export default Footer;
