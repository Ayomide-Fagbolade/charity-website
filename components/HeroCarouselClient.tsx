'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowRight } from 'lucide-react';

type CarouselImage = {
  src: string;
  alt: string;
};

interface HeroCarouselClientProps {
  images: CarouselImage[];
  variant?: 'hero' | 'minimal';
  className?: string;
}

export default function HeroCarouselClient({ images, variant = 'hero', className = '' }: HeroCarouselClientProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const isHero = variant === 'hero';

  return (
    <section
      className={`relative overflow-hidden ${isHero ? 'py-20 md:py-32 px-4 min-h-[600px] md:min-h-[700px]' : 'h-full w-full'
        } ${className}`}
    >
      {/* Background images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            priority={index === 0}
          />
        ))}
        <div className={`absolute inset-0 bg-linear-to-r ${isHero ? 'from-black/20 via-black/10 to-black/20' : 'from-black/10 via-transparent to-black/10'
          }`} />
      </div>

      {/* Content - Only for Hero variant */}
      {isHero && (
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-2xl">
            <div className="space-y-6 bg-black/5 p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">

              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Building sustainable campus communities by redistributing usable items to students in need.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="bg-primary text-white hover:bg-white/90">
                  <Link href="/donate">
                    Donate Now <Heart className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/30 text-black hover:bg-white/10 hover:text-white"
                >
                  <Link href="/projects">
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Indicators */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 flex gap-2 z-20 ${isHero ? 'bottom-8' : 'bottom-4'
        }`}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'
              } ${isHero ? 'w-2 h-2' : 'w-1.5 h-1.5'} ${index === currentIndex && isHero ? 'w-8' : ''
              } ${index === currentIndex && !isHero ? 'w-6' : ''
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
