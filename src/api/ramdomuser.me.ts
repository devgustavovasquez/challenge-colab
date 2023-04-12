import config from "@/config/env";
import { UsersData } from "@/pages/interfaces";
import { useEffect, useState } from "react";

const API_URL = config.API.users.url();

export function useFetchData(
  offset: number | null
): [UsersData | undefined, boolean, boolean] {
  const [data, setData] = useState<UsersData>();
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
        setData(data);
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
