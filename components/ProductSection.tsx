'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { convertStringToQueriesObject } from '../components/client/FilterSection';
import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

function isAvailable(arr1?: string[], arr2?: string[]) {
  if (!arr1 || !arr2) return true;
  return arr1.some((item) => arr2.includes(item));
}

const ProductSection = () => {
  const searchParams = useSearchParams();

  // 🧠 This ensures filtering re-runs every time the URL changes
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
  }, [searchParams]); // 🔥 Run this every time searchParams change

  if (filteredProducts.length === 0) {
    return <p className="text-center text-slate-700">No Product Available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {filteredProducts.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-md aspect-[4/5] object-cover object-top"
            />
            <div className="space-y-2 mt-4">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-sm text-slate-600">{product.desc}</p>
              <p className="text-sm text-slate-500">
                Category: {product.categories.join(', ')}
              </p>
              <p className="font-semibold text-base">Rs: {product.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">4.2</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductSection;
