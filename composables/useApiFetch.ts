export const useApiFetch = async (path: string, options?: object) => {
  const config = useRuntimeConfig();
  options = {
    headers: {
      Authorization: `Bearer ${config.public.apiKey}`,
    },
    watch: false,
    ...options,
  };
  return await useFetch(config.public.apiUrl + path, options);
};
