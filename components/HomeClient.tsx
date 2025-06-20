'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
// ✅ Dynamic client components
const Navbar = dynamic(() => import('@/components/client/Navbar'));
const FilterSection = dynamic(() => import('@/components/client/FilterSection'));
const ProductSection = dynamic(() => import('@/components/ProductSection'));
const Footer = dynamic(() => import('@/components/client/Footer')); // ✅ Add this line

export default function HomeClient() {
  return (
    <main className="min-h-screen w-full">
      {/* Navbar */}
      <div className="w-full bg-white border-b">
        <Suspense fallback={<p>Loading navbar...</p>}>
          <Navbar />
        </Suspense>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="md:col-span-1">
          <Suspense fallback={<p>Loading filters...</p>}>
            <FilterSection />
          </Suspense>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          <Suspense fallback={<p>Loading products...</p>}>
            <ProductSection />
          </Suspense>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <Suspense fallback={<p>Loading footer...</p>}>
          <Footer />
        </Suspense>
      </div>
    </main>
  );
}
