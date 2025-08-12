import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetch(endpoint: string) {
  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  return { data, error, isLoading };
}
