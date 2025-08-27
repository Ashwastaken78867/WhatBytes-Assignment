'use client';

import { products } from "../lib/products";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg font-medium">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <span className="text-sm text-gray-600 font-medium">4.3 (120 Reviews)</span>
          </div>

          <p className="text-2xl text-gray-800 font-semibold">Rs {product.price}</p>

          <p className="text-gray-700 leading-relaxed">{product.desc}</p>

          <p className="text-sm text-gray-500">
            Category: <span className="font-medium text-gray-700">{product.categories.join(", ")}</span>
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
