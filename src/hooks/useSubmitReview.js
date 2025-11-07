import { useMutation } from "@apollo/client";
import { SUBMIT_REVIEW } from "../graphql/mutations";

const useSubmitReview = () => {
  const [mutate, result] = useMutation(SUBMIT_REVIEW);

  const submitReview = async ({ repositoryName, ownerName, rating, text }) => {
    const numericRating = parseInt(rating);
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: numericRating,
          text,
        },
      },
    });

    return data?.createReview;
  };

  return [submitReview, result];
};

export default useSubmitReview;
