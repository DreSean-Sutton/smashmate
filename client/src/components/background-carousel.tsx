import Carousel from 'react-bootstrap/Carousel';

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
          <img
            className="background-images"
            src={image.url}
            alt={image.name}
            />
        </Carousel.Item>
    );
  });
  return (
    <Carousel fade controls={false} pause={false} className='background-img-layout'>
      { allThings }
    </Carousel>
  );
}
