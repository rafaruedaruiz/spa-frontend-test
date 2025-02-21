'use client';

import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '../graphql/queries';
import ImageCard from './ImageCard';
import { Container, Row, Col } from 'react-bootstrap';

interface Image {
  id: string;
  picture: string;
  title: string;
  author: string;
  liked: boolean;
  likesCount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface GetImagesData {
  images: {
    nodes: Image[];
  };
}

interface GetImagesVars {
  title: string;
}

interface ImageListProps {
  searchTerm: string;
}

const ImageList: React.FC<ImageListProps> = ({ searchTerm }) => {
  const { data, loading, fetchMore, refetch } = useQuery<GetImagesData, GetImagesVars>(GET_IMAGES, {
    variables: { title: searchTerm },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({ title: searchTerm });
  }, [searchTerm, refetch]);

  if (loading) return <p className="text-center">Cargando...</p>;

  const fetchMoreImages = () => {
    fetchMore({
      variables: { title: searchTerm },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          images: {
            nodes: [...prev.images.nodes, ...fetchMoreResult.images.nodes],
          },
        };
      },
    });
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={data?.images?.nodes.length || 0}
        next={fetchMoreImages}
        hasMore={true}
        loader={<h4 className="text-center">Cargando más imágenes...</h4>}
      >
        <Row className="justify-content-center">
          {data?.images?.nodes.map((image) => (
            <Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ImageCard image={image} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};

export default ImageList;