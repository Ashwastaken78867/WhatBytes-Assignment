'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { convertStringToQueriesObject } from '../components/client/FilterSection';
import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/context/CartContext';

function isAvailable(arr1?: string[], arr2?: string[]) {
  if (!arr1 || !arr2) return true;
  return arr1.some((item) => arr2.includes(item));
}

const ProductSection = () => {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    const paramsObj = convertStringToQueriesObject(searchParams);
    const isAll = paramsObj?.categories?.includes('all');

    let results = products.filter((product) => {
      const hasCategory = isAll || isAvailable(product.categories, paramsObj?.categories);
      const hasColor = isAvailable(product.colors, paramsObj?.colors);
      const hasSize = isAvailable(product.sizes, paramsObj?.sizes);
      const withinPrice = !paramsObj.price?.[0] || product.price <= Number(paramsObj.price[0]);
      const matchesSearch =
        !paramsObj.search?.[0] ||
        product.title.toLowerCase().includes(paramsObj.search[0].toLowerCase());

      return hasCategory && hasColor && hasSize && withinPrice && matchesSearch;
    });

    if (paramsObj?.sort?.[0]) {
      results = results.sort((a, b) => {
        switch (paramsObj.sort[0]) {
          case 'price high low':
            return b.price - a.price;
          case 'price low high':
            return a.price - b.price;
          case 'newest':
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          default:
            return 0;
        }
      });
    }

    if (Object.keys(paramsObj).length === 0) return products;

    return results;
  }, [searchParams]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-gray-500 text-lg mt-10">No Products Available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
        >
          {/* Image */}
          <Link href={`/product/${product.id}`} className="relative group overflow-hidden rounded-t-lg">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
            />
          </Link>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between p-4 space-y-2">
            <Link href={`/product/${product.id}`} className="hover:underline">
              <h2 className="font-semibold text-lg text-gray-900">{product.title}</h2>
            </Link>

            <p className="text-sm text-gray-600">{product.desc}</p>
            <p className="text-sm text-gray-500">Category: {product.categories.join(', ')}</p>
            <p className="font-semibold text-lg text-gray-800">Rs {product.price}</p>

            {/* Static Rating */}
            <div className="flex items-center gap-1 mt-1">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 ml-2">4.2</span>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
