export const { data: rawPets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: handleGetPets,
  });