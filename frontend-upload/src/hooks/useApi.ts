import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type UseApiReturnType<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
  updateUrl: (newUrl: string) => void;
  updateOptions: (newOptions: AxiosRequestConfig) => void;
};

const useApi = <T = unknown>(
  initialUrl: string,
  initialOptions: AxiosRequestConfig = {}
): UseApiReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(initialUrl);
  const [options, setOptions] = useState<AxiosRequestConfig>(initialOptions);

  const fetchData = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<T> = await axios({ url, ...options });
      setData(response.data);
      return response.data; // Return the response data
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || err.message || "Unknown error");
      } else {
        setError("An unexpected error occurred");
      }
      return null; // Return null on error
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (url) fetchData();
  }, [url, options, fetchData]);

  const updateUrl = (newUrl: string) => setUrl(newUrl);
  const updateOptions = (newOptions: AxiosRequestConfig) =>
    setOptions(newOptions);

  return { data, error, loading, refetch: fetchData, updateUrl, updateOptions };
};

export default useApi;
