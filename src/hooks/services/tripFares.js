import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/config/queryClient";
import api from "@/lib/api";
import { config } from "@/config/config";

export const useGetTripFares = (query) => {
  const {
    isLoading,
    error,
    data: tripFares,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["tripFares", query],
    queryFn: () => api.get("/tripFares", query),
    enabled: config?.is_dev,
    ...queryConfig.staticData,
  });

  return { isLoading, error, tripFares: tripFares?.data, refetch, isRefetching };
};

export const useGetAvailableCombinations = (query) => {
  const {
    isLoading,
    error,
    data: availableCombinations,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["availableCombinations", query],
    queryFn: () => api.get("/availableCombinations", query),
    enabled: config?.is_dev,
    ...queryConfig.staticData,
  });

  return { isLoading, error, availableCombinations: availableCombinations?.data, refetch, isRefetching };
};

export const useGetItineraries = (query) => {
  const {
    isLoading,
    error,
    data: itineraries,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["itineraries", query],
    queryFn: () => api.get("/itineraries", query),
    enabled: config?.is_dev,
    ...queryConfig.staticData,
  });

  return { isLoading, error, itineraries: itineraries?.data, refetch, isRefetching };
};
