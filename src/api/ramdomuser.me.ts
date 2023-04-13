import { UserData } from "@/types/interfaces";
import getConfig from "next/config";
import { useEffect, useState } from "react";

const API_URL = getConfig().publicRuntimeConfig.API_USERS_URL;

export function useFetchData(
  offset: number | null
): [
  UserData[] | undefined,
  boolean,
  boolean,
  (limit: number | null, prevState?: UserData[]) => Promise<void>
] {
  const [data, setData] = useState<UserData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (limit: number | null, prevState?: UserData[]) => {
    if (limit === null) {
      setData([]);
      return;
    }

    setIsError(false);
    setIsLoading(true);

    try {
      const result = await fetch(`${API_URL}?results=${limit}`);
      const data = await result.json();

      if (prevState) {
        setData([...prevState, ...data.results]);
      } else {
        setData(data.results);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (offset) {
      fetchData(offset);
    }

    return () => {
      setData([]);
    };
  }, [offset]);

  return [data, isLoading, isError, fetchData];
}
