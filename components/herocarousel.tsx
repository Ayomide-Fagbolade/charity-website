import { getCarouselImages } from '@/lib/getCarouselImages';
import HeroCarouselClient from './HeroCarouselClient';

interface HeroCarouselProps {
  variant?: 'hero' | 'minimal';
  className?: string;
}

export default function HeroCarousel({ variant = 'hero', className }: HeroCarouselProps) {
  const images = getCarouselImages();

  return <HeroCarouselClient images={images} variant={variant} className={className} />;
}
