import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://pro-api.coingecko.com/api/v3",
  headers: {
    accept: "application/json",
    "x-cg-pro-api-key": "CG-19krXnFtKmLTFpPY5Pw5D8XM",
  },
});

const getTopGainers = async () => {
  try {
    const response = await api.get(`/coins/top_gainers_losers`);
    return response;
  } catch (error) {
    console.error("Error fetching top gainers:", error);
    throw error;
  }
};

const getMarketCap = async () => {
    try {
      const response = await api.get(`/coins/top_gainers_losers`);
      return response;
    } catch (error) {
      console.error("Error fetching market cap:", error);
      throw error;
    }
  };

export const useTopGainers = () => {
  return useQuery({
    queryKey: ["topGainers"],
    queryFn: async () => {
      return getTopGainers();
    },
  });
};


export const useMarketCap = () => {
    return useQuery({
      queryKey: ["marketCap"],
      queryFn: async () => {
        return getMarketCap();
      },
    });
  };
