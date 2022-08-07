import { Fetcher } from "swr";

const apiFetcher: Fetcher = async (apiUrl: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, { headers: { accept: "application/json" } });

  return res.json();
};

export default apiFetcher;
