"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCarouselProps {
    images: string[];
    title: string;
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    if (!images || images.length === 0) return null;

    return (
        <div className="relative group overflow-hidden rounded-2xl aspect-[16/9] bg-muted shadow-lg">
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${idx === currentIndex ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-105 translate-x-10 pointer-events-none"
                        }`}
                >
                    <Image
                        src={img}
                        alt={`${title} - image ${idx + 1}`}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                    />
                </div>
            ))}

            {images.length > 1 && (
                <>
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prev}
                            className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm border-none hover:bg-white"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={next}
                            className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm border-none hover:bg-white"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
