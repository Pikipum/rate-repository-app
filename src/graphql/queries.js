import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Node {
    repositories {
      edges {
        node {
          id
          ownerName
          name
          fullName
          reviews {
            totalCount
          }
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

