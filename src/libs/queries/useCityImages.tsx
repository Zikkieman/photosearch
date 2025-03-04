import { useQuery } from "@tanstack/react-query";

const fetchCityImages = async (city: string, page: number) => {
  const res = await fetch(`/api/unsplash?city=${city}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
};

export function useCityImages(city: string, page: number) {
  return useQuery({
    queryKey: ["cityImages", city, page],
    queryFn: () => fetchCityImages(city, page),
    enabled: !!city,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
