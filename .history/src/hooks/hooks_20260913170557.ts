import { useQuery } from "@tanstack/react-query";

export const { data: rawPets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: handleGetPets,
  });