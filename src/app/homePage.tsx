"use client";

import TomorrowDate from "@/helpers/date";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataType } from "@/libs/types";
import { useCityImages } from "@/libs/queries/useCityImages";
import Spinner from "@/components/spinner/Spinner";
import Image from "next/image";
import CityCard from "@/components/cards/cityCard";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cityFromUrl = searchParams.get("search") || "Abuja";

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(cityFromUrl);
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<DataType[]>([]);

  const { data, isLoading, error } = useCityImages(selectedCity, page);
  const CardDetails: DataType[] = data?.results || [];

  useEffect(() => {
    setSelectedCity(cityFromUrl);
    setPage(1);
    setAllResults([]);
  }, [cityFromUrl]);

  const handleSearch = () => {
    if (!city.trim()) return;
    router.push(`/?search=${city}`);
    setSelectedCity(city);
    setPage(1);
    setAllResults([]);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (CardDetails.length > 0) {
      setAllResults((prev) => [...prev, ...CardDetails]);
    }
  }, [data]);

  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="pt-20 w-full min-h-full  px-4 max-w-5xl mx-auto font-arial">
        <div className="mb-20 flex flex-col sm:flex-row justify-between items-center">
          <h5 className="font-pac font-bold text-2xl">PhotoSearch.</h5>
          <p className="font-arial">{TomorrowDate()}</p>
        </div>

        <div className="flex items-center gap-5 mb-20">
          <input
            className="w-full outline-1 outline-gray-300 placeholder:font-arial placeholder:text-gray-400 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-blue-500 sm:text-sm/6"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-arial font-semibold text-white shadow-sm hover:bg-blue-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {CardDetails.length > 0 && (
          <div>
            <h5 className="text-2xl mb-4">
              Showing results for{" "}
              <span className="font-bold border-b border-dotted border-black capitalize">
                {selectedCity}
              </span>
            </h5>
          </div>
        )}

        {isLoading && page === 1 ? (
          <div className="mt-10">
            <Spinner />
          </div>
        ) : !isLoading &&
          data !== undefined &&
          (error || CardDetails.length === 0) ? (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col items-center mt-12 py-12">
            <Image
              src="/no-results.svg"
              alt="error-image"
              width={200}
              height={200}
            />
            {CardDetails.length === 0 && (
              <p className="mt-6 text-xl font-normal">
                No result found for{" "}
                <span className="font-bold border-b border-dotted border-black">
                  {selectedCity}
                </span>
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {allResults.map((item) => (
                <CityCard key={item.id} item={item} />
              ))}
            </div>

            {allResults.length > 0 && (
              <div className="mt-10 mb-20 mx-auto">
                <button
                  className="bg-white border-[0.5px] border-gray-300 font-semibold text-sm shadow-sm hover:bg-gray-50 py-2 px-3 rounded-md text-black"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="w-full flex gap-1 justify-center mb-14 font-arial mt-auto">
        <span className="text-[#212529] text-sm">
          {" "}
          © {new Date().getFullYear()}{" "}
        </span>{" "}
        <span className="font-pac text-sm">PhotoSearch.</span>{" "}
        <span className="font-normal text-sm text-[#212529]">
          ❤️ Ezekiel Oladele
        </span>
      </footer>
      <div className="absolute inset-x-0 top-0 bottom-0 z-[-1] flex flex-col">
        <div className="h-1/2 bg-[#f4f4f4]"></div>
        <div className="h-1/2 bg-[#ffffff]"></div>
      </div>
    </div>
  );
}
