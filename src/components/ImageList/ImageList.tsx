'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '../../graphql/queries';
import ImageCard from '../ImageCard/ImageCard';
import { Row, Col } from 'react-bootstrap';
import styles from './ImageList.module.css';

const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'), { ssr: false });

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
  const { data, loading, fetchMore, refetch } = useQuery<GetImagesData, GetImagesVars>(
    GET_IMAGES,
    {
      variables: { title: searchTerm },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    refetch({ title: searchTerm });
  }, [searchTerm, refetch]);

  if (loading && !data) return <p className="text-center">Loading...</p>;

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
      <div id="scrollableDiv" className={styles.scrollableDiv}>
        <InfiniteScroll
          dataLength={data?.images?.nodes.length || 0}
          next={fetchMoreImages}
          hasMore={true}
          loader={<h4 className="text-center"></h4>}
          scrollableTarget="scrollableDiv"
        >
          <Row className="justify-content-center g-0">
            {data?.images?.nodes.map((image, index) => (
              <Col key={`${image.id}-${index}`} xs={12} sm={12} md={6} lg={4} xl={4} xxl={3}>
                <div className={styles.imageWrapper}>
                  <ImageCard image={image} />
                </div>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
  );
};

export default ImageList;