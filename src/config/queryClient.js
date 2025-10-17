import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  EXTENDED: 24 * 60 * 60 * 1000, // 24 hours
};

export const STALE_TIME = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 15 * 60 * 1000, // 15 minutes
  EXTENDED: 60 * 60 * 1000, // 1 hour
};

export const queryConfig = {
  staticData: {
    staleTime: STALE_TIME.EXTENDED,
    cacheTime: CACHE_TIME.EXTENDED,
  },
};
