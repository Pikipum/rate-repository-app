import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedFilter, searchQuery) => {
  let variables = {};

  switch (selectedFilter) {
    case "HIGHEST_RATED":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
        searchKeyword: searchQuery,
      };
      break;
    case "LOWEST_RATED":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
        searchKeyword: searchQuery,
      };
      break;
    default:
      variables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
        searchKeyword: searchQuery,
      };
  }

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const repositories = data?.repositories ?? null;

  return { repositories, loading, error, refetch };
};

export default useRepositories;
