'use client';

import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LIKE_IMAGE_MUTATION } from '../../graphql/mutations';
import { Heart, Send } from 'react-bootstrap-icons';
import styles from './ImageCard.module.css';

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
    <Card className={styles.card}>
      <div className={styles.priceTag}>${image.price}</div>
      <div className={styles.imageContainer}>
        <Card.Img className={styles.cardImg} variant="top" src={image.picture} alt={image.title} />
        <div className={styles.actionContainer}>
          <div className={styles.likeContainer} onClick={handleLike}>
            {liked ? (
              <Heart className={`${styles.likeIcon} ${styles.liked}`} />
            ) : (
              <Heart className={styles.likeIcon} />
            )}
            <span className={styles.likeCounter}>{likesCount}</span>
          </div>
          <div className={styles.shareContainer}>
            <Send className={styles.shareIcon} />
            <span className={styles.shareCounter}>0</span>
          </div>
        </div>
      </div>
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>{image.title}</Card.Title>
        <Card.Text className={styles.author}>
          by <span>{image.author}</span>
        </Card.Text>
      </Card.Body>
      <div className={styles.mobileActionContainer}>
        <div className={styles.mobileLeft} onClick={handleLike}>
        <span className={styles.mobileCounter}>{likesCount}</span>
          {liked ? (
            <Heart className={`${styles.mobileIcon} ${styles.liked}`} />
          ) : (
            <Heart className={styles.mobileIcon} />
          )}
        </div>
        <div className={styles.mobileRight}>
        <span className={styles.mobileCounter}>0</span>
          <Send className={styles.mobileIcon} />
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;