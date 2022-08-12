import { Fetcher } from "swr";

const apiFetcher: Fetcher = async (apiUrl: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, { headers: { accept: "application/json" } });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());

    throw error;
  }

  return res.json();
};

export default apiFetcher;
