import { gql } from '@apollo/client';

export const LIKE_IMAGE_MUTATION = gql`
  mutation likeImage($imageId: ID!) {
    likeImage(input: { imageId: $imageId }) {
      image {
        id
        liked
        likesCount
      }
    }
  }
`;