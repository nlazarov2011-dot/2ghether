import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const motion = m as any;

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setIsZoomMode(false);
      setCursorPos({ x: 50, y: 50 });
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (!isZoomMode) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isZoomMode]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
    setIsZoomMode(false);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomMode(false);
  };

  const toggleZoomMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomMode(!isZoomMode);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomMode) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPos({ x, y });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center touch-none"
        onClick={onClose}
      >
        {/* Controls Toolbar (Top Right) */}
        <div 
          className="absolute top-6 right-6 z-[160] flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
            <button
              onClick={toggleZoomMode}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              title={isZoomMode ? "Намали" : "Увеличи"}
            >
              {isZoomMode ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              title="Затвори"
            >
              <X size={24} />
            </button>
        </div>

        {/* Navigation Arrows (Hidden if Zoomed) */}
        {images.length > 1 && !isZoomMode && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[160]"
              title="Предишна"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[160]"
              title="Следваща"
            >
              <ChevronRight size={40} />
            </button>
          </>
        )}

        {/* Image Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center p-0 md:p-10 overflow-hidden"
        >
           <motion.div
             key={index}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.3 }}
             className="relative flex items-center justify-center"
           >
             <img
               src={images[index]}
               alt={`Full view ${index + 1}`}
               className={`max-w-full max-h-[90vh] md:max-h-[95vh] object-contain select-none transition-transform duration-300 ease-out ${isZoomMode ? 'cursor-move' : 'cursor-default'}`}
               draggable={false}
               onClick={toggleZoomMode}
               onMouseMove={handleMouseMove}
               style={{
                 transform: isZoomMode ? 'scale(2.5)' : 'scale(1)',
                 transformOrigin: isZoomMode ? `${cursorPos.x}% ${cursorPos.y}%` : 'center center',
               }}
             />
           </motion.div>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest z-[160] pointer-events-none">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;