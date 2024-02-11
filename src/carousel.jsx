import Carousel from 'react-bootstrap/Carousel';
import imageOne from './shutterstock_357666554.jpg';
import imageTwo from "./shutterstock_380043169.jpg";
import imageThree from "./shutterstock_367553489.jpg"
function CarouselFadeExample() {
  return (
    <Carousel fade touch interval={2000}>
      <Carousel.Item>
        <img className='img-carousel' src={imageOne}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className='img-carousel' src={imageTwo}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className='img-carousel' src={imageThree}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;