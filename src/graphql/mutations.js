import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SUBMIT_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      text
      rating
      createdAt
      user {
        id
        username
      }
      repository {
        id
        name
        ownerName
      }
    }
  }
`;
