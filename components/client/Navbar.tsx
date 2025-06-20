"use client";

import { Search, ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { PackageCheck } from "lucide-react"; // 👈 Add at top of the file

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchTerm(currentSearch);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);

    // Build the new URL with updated search param
    const params = new URLSearchParams(searchParams);
    if (newSearch.trim() !== "") {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between">
      {/* Logo */}

<div className="flex items-center gap-2 text-white">
  <PackageCheck className="w-6 h-6" />
  <span className="text-2xl font-bold">WhatBytes</span>
</div>
      {/* Search Bar */}
      <div className="flex items-center bg-blue-500 border border-cyan-300 rounded-full px-4 py-2 w-full max-w-md mx-4">
        <Search className="w-5 h-5 text-white mr-2" />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-transparent outline-none text-white placeholder-white w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Cart Button */}
      <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
      </button>
    </nav>
  );
}
