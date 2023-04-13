import { UserData } from "@/pages/interfaces";
import getConfig from "next/config";
import { useEffect, useState } from "react";

const API_URL = getConfig().publicRuntimeConfig.API_USERS_URL;

export function useFetchData(
  offset: number | null
): [UserData[] | undefined, boolean, boolean] {
  const [data, setData] = useState<UserData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!offset) {
        setData(undefined);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(API_URL + `?results=${offset}`);
        const data = await response.json();
        const { results } = data;
        setData(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [offset]);

  return [data, isLoading, isError];
}
