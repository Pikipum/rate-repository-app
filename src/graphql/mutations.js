import { gql } from "@apollo/client";
/*
export const SIGN_IN = gql`
  mutation Authenticate {
  $username: String!
    authenticate(credentials: { username: String!, password: String! }) {
      accessToken
    }
  }
`;
*/

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
