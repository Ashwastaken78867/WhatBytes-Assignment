"use client";

import { products } from "../lib/products"; // adjust if needed
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image */}
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{product.title}</h1>

        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">4.3 (120 Reviews)</span>
        </div>

        <p className="text-lg text-gray-800 font-medium">Rs: {product.price}</p>

        <p className="text-gray-600">{product.desc}</p>

        <p className="text-sm text-gray-500">
          Category: {product.categories.join(", ")}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Quantity:</label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
