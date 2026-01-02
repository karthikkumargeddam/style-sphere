import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageZoomProps {
    images: string[];
    alt: string;
    currentIndex?: number;
}

const ImageZoom = ({ images, alt, currentIndex = 0 }: ImageZoomProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(currentIndex);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleOpen = (index: number = 0) => {
        setActiveIndex(index);
        setIsOpen(true);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = "hidden";
    };

    const handleClose = () => {
        setIsOpen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = "";
    };

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - 0.5, 1));
        if (scale <= 1.5) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrevious();
    };

    return (
        <>
            {/* Trigger Image */}
            <div
                className="relative group cursor-zoom-in"
                onClick={() => handleOpen(currentIndex)}
            >
                <img src={images[currentIndex]} alt={alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity glass p-3 rounded-full">
                        <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
                        onClick={handleClose}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 glass p-3 rounded-full hover:bg-white/20 transition-all"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomOut();
                                }}
                                disabled={scale <= 1}
                                className="glass p-3 rounded-full hover:bg-white/20 transition-all disabled:opacity-50"
                            >
                                <ZoomOut className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomIn();
                                }}
                                disabled={scale >= 3}
                                className="glass p-3 rounded-full hover:bg-white/20 transition-all disabled:opacity-50"
                            >
                                <ZoomIn className="w-5 h-5 text-white" />
                            </button>
                            <div className="glass px-4 py-3 rounded-full text-white text-sm font-medium">
                                {Math.round(scale * 100)}%
                            </div>
                        </div>

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 glass px-4 py-2 rounded-full text-white text-sm font-medium">
                                {activeIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Main Image */}
                        <div
                            className="absolute inset-0 flex items-center justify-center p-16"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={activeIndex}
                                src={images[activeIndex]}
                                alt={alt}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale,
                                    x: position.x,
                                    y: position.y,
                                }}
                                transition={{ duration: 0.3 }}
                                className="max-w-full max-h-full object-contain cursor-move"
                                draggable={scale > 1}
                                onDragEnd={(e, info) => {
                                    if (scale > 1) {
                                        setPosition((prev) => ({
                                            x: prev.x + info.offset.x,
                                            y: prev.y + info.offset.y,
                                        }));
                                    }
                                }}
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevious();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 glass p-4 rounded-full hover:bg-white/20 transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 glass p-4 rounded-full hover:bg-white/20 transition-all"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 glass p-2 rounded-lg">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveIndex(index);
                                            setScale(1);
                                            setPosition({ x: 0, y: 0 });
                                        }}
                                        className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${index === activeIndex
                                                ? "border-primary scale-110"
                                                : "border-transparent hover:border-white/50"
                                            }`}
                                    >
                                        <img src={img} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageZoom;
