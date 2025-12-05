import { getCarouselImages } from '@/lib/getCarouselImages';
import HeroCarouselClient from './HeroCarouselClient';

export default function HeroCarousel() {
  const images = getCarouselImages();

  return <HeroCarouselClient images={images} />;
}
