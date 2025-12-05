import fs from 'fs';
import path from 'path';

export function getCarouselImages() {
  const carouselDir = path.join(process.cwd(), 'public/carousel'); // adjust folder name
  const files = fs.readdirSync(carouselDir);

  return files
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .map((file) => ({
      src: `/carousel/${file}`,
      alt: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '), // filename → readable alt text
    }));
}
