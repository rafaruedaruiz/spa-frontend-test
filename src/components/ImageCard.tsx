'use client';

import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LIKE_IMAGE_MUTATION } from '../graphql/mutations';

interface ImageData {
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

interface ImageCardProps {
  image: ImageData;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [liked, setLiked] = useState(image.liked);
  const [likesCount, setLikesCount] = useState(image.likesCount);

  const [likeImage] = useMutation(LIKE_IMAGE_MUTATION, {
    variables: { imageId: image.id },
    onCompleted: (data) => {
      if (data?.likeImage?.image) {
        setLiked(data.likeImage.image.liked);
        setLikesCount(data.likeImage.image.likesCount);
      }
    },
    onError: (error) => {
      console.error('Error al actualizar like:', error);
      setLiked(image.liked);
      setLikesCount(image.likesCount);
    },
  });

  const handleLike = async () => {
    try {
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      await likeImage();
    } catch (error) {
      console.error("Error al hacer like/unlike:", error);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Img variant="top" src={image.picture} alt={image.title} />
      <Card.Body>
        <Card.Title>{image.title}</Card.Title>
        <Card.Text>
          <strong>Autor:</strong> {image.author} <br />
          <strong>Precio:</strong> ${image.price} <br />
          <strong>Likes:</strong> {likesCount}
        </Card.Text>
        <Button
          variant={liked ? 'danger' : 'primary'}
          onClick={handleLike}
          className="w-100"
        >
          {liked ? 'Dislike' : 'Like'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;