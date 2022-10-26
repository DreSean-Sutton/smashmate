import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function BackgroundCarousel() {

  const imageArray = [
    { name: 'Smash Ultimate Characters', id: 1, url: './images/smash-ultimate-background/smashmate-background-1.jpg' },
    { name: 'Smash Ultimate Characters', id: 2, url: './images/smash-ultimate-background/smashmate-background-2.jpg' },
    { name: 'Smash Ultimate Characters', id: 3, url: './images/smash-ultimate-background/smashmate-background-3.jpg' },
    { name: 'Smash Ultimate Characters', id: 4, url: './images/smash-ultimate-background/smashmate-background-4.jpg' },
    { name: 'Smash Ultimate Characters', id: 5, url: './images/smash-ultimate-background/smashmate-background-5.jpg' }
  ];
  const allThings = imageArray.map(image => {
    return (
        <Carousel.Item interval={10000} key={image.id}>
          <img style={{
            objectFit: 'cover',
            minHeight: '100vh'
          }}
            src={image.url}
            alt={image.name}
            />
        </Carousel.Item>
    );
  });
  return (
    <Carousel style={{
      position: 'fixed',
      top: '5%',
      right: '0',
      bottom: '0',
      left: '0',
      minWidth: '85vh',
      height: '100vh',
      zIndex: '-1',
      userSelect: 'none'
    }}
      fade controls={false}
      pause={false}
      indicators={false}>
      { allThings }
    </Carousel>
  );
}
