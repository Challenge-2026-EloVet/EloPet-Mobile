import { useQuery } from "@tanstack/react-query";
import { handleGetPets } from "./handlers";

export const { data: rawPets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: handleGetPets,
  });