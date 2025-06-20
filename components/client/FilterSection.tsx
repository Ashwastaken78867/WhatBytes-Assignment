"use client";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export function checkValidQuery(queries: string[]): boolean {
  return queries.filter((query) => query !== "").length > 0;
}

export function convertStringToQueriesObject(searchParams: ReadonlyURLSearchParams): Record<string, string[]> {
  const selectedQueries: Record<string, string[]> = {};
  searchParams.forEach((values, key) => {
    const queries = values.split(",");
    selectedQueries[key] = queries;
  });
  return selectedQueries;
}

export function convertValidStringQueries(queries: Record<string, string[]>): string {
  return Object.entries(queries)
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => `${key}=${values.join(",")}`)
    .join("&");
}

const FilterSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilterQueries, setSelectedFilterQueries] = useState<Record<string, string[]>>({});
  const [price, setPrice] = useState(1000);

  useEffect(() => {
    const paramsObj = convertStringToQueriesObject(searchParams);
    setSelectedFilterQueries(paramsObj);
    if (paramsObj.price?.[0]) setPrice(Number(paramsObj.price[0]));
  }, [searchParams]);

  function handleSelectFilterOptions(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    const type = e.target.type;
    const selectedQueries = { ...selectedFilterQueries };

    if (name === "categories") {
      selectedQueries["categories"] = [value];
    } else {
      if (selectedQueries[name]) {
        if (type === "radio") {
          selectedQueries[name] = [value];
        } else if (selectedQueries[name].includes(value)) {
          selectedQueries[name] = selectedQueries[name].filter((v) => v !== value);
          if (!checkValidQuery(selectedQueries[name])) delete selectedQueries[name];
        } else {
          selectedQueries[name].push(value);
        }
      } else {
        selectedQueries[name] = [value];
      }
    }

    router.push(`/?${convertValidStringQueries(selectedQueries)}`);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const newPrice = e.target.value;
    setPrice(Number(newPrice));
    const selectedQueries = { ...selectedFilterQueries, price: [newPrice] };
    router.push(`/?${convertValidStringQueries(selectedQueries)}`);
  }

  function isChecked(id: string, option: string) {
    return selectedFilterQueries[id]?.includes(option.toLowerCase()) ?? false;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-800">Filters</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Category</p>
          <div className="space-y-2">
            {["all", "electronics", "clothing", "home"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm capitalize">
                <input
                  type="radio"
                  name="categories"
                  value={cat}
                  checked={isChecked("categories", cat)}
                  onChange={handleSelectFilterOptions}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Price</p>
          <input
            type="range"
            name="price"
            min={0}
            max={1000}
            value={price}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="text-xs text-slate-600">Up to ₹{price}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
