import fs from 'fs';
import path from 'path';

export function getCarouselImages() {
  const carouselDir = path.join(process.cwd(), '/carousel_images'); // adjust folder name
  const files = fs.readdirSync(carouselDir);

  return files
    .map((file) => ({
      src: `/carousel_images/${file}`,
      alt: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '), // filename → readable alt text
    }));
}
