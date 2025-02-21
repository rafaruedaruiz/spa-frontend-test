import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query getImages($title: String) {
    images(title: $title) {
      nodes {
        id
        author
        createdAt
        liked
        likesCount
        picture
        price
        title
        updatedAt
      }
    }
  }
`;