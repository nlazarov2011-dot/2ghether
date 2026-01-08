import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const motion = m as any;

interface ProductGalleryProps {
  images: string[];
  isSale?: boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, isSale }) => {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const setPage = (newIndex: number) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Main Display Container - Fixed Height & Strict Constraints */}
      <div 
        className="relative w-full h-[350px] md:h-[500px] bg-[#111] rounded-xl overflow-hidden group border border-neutral-800 flex items-center justify-center cursor-pointer"
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* Sale Badge */}
        {isSale && (
          <div className="absolute top-4 left-4 z-20 bg-red-600 text-white font-bold text-[10px] uppercase px-3 py-1 rounded shadow-lg pointer-events-none">
            Sale
          </div>
        )}

        {/* Carousel Image Wrapper */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-4"
          >
            <img 
              src={images[index]} 
              alt={`Product view ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Controls (Arrows) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-black z-30 transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-black z-30 transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Pagination */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 py-2 px-3 rounded-full bg-black/20 backdrop-blur-sm pointer-events-none">
             {images.map((_, i) => (
               <div 
                 key={i} 
                 className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
               />
             ))}
          </div>
        )}

        {/* Hint Icon */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="bg-black/50 backdrop-blur p-2 rounded-full text-white">
             <Maximize2 size={20} />
           </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`
                relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-[#111]
                ${index === i 
                  ? 'border-brand-accent opacity-100 ring-2 ring-brand-accent/20' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-neutral-700'
                }
              `}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${i + 1}`} 
                className="w-full h-full object-contain p-1" 
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        initialIndex={index}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};

export default ProductGallery;