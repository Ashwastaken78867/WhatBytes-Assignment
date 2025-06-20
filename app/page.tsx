import { Suspense } from "react";
import dynamic from "next/dynamic";

import HomeClient from "@/components/HomeClient";


export default function Home() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <HomeClient />
    </Suspense>
  );
}
