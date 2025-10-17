// import { useState } from 'react';
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// const galleryImages = {
//   'Past Marathons': [
//     {
//       src: '../assets/img-1.jpg',
//       caption: 'Marathon 2024 - Finish Line Celebrations',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1524646349956-1590eacfa324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMGZpbmlzaCUyMGxpbmV8ZW58MXx8fHwxNzYwNjYzODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
//       caption: 'Champions crossing the finish line',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1748430788520-986bb40be40b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwcmFjZSUyMGNyb3dkfGVufDF8fHx8MTc2MDY2MzgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
//       caption: 'The amazing crowd support',
//     },
//   ],
//   'Training Days': [
//     {
//       src: 'https://images.unsplash.com/photo-1586161659971-eba80f40b31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3JvdXAlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjA2NzQ2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
//       caption: 'Weekend training sessions',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1652191090258-5a2df9ad6723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MDY3Nzk5NHww&ixlib=rb-4.1.0&q=80&w=1080',
//       caption: 'Outdoor training camp',
//     },
//   ],
//   'Team Events': [
//     {
//       src: 'https://images.unsplash.com/photo-1628440167042-197d8eb88929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwcmFjZXxlbnwxfHx8fDE3NjA2Nzc5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
//       caption: 'Cycling team in action',
//     },
//   ],
// };

// export default function Gallery() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <section id="gallery" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mb-4">Gallery</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Relive the moments of triumph, determination, and community spirit from our events.
//           </p>
//         </div>

//         <Tabs defaultValue="Past Marathons" className="w-full">
//           <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
//             <TabsTrigger value="Past Marathons">Past Marathons</TabsTrigger>
//             <TabsTrigger value="Training Days">Training Days</TabsTrigger>
//             <TabsTrigger value="Team Events">Team Events</TabsTrigger>
//           </TabsList>

//           {Object.entries(galleryImages).map(([category, images]) => (
//             <TabsContent key={category} value={category}>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {images.map((image, index) => (
//                   <div
//                     key={index}
//                     className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-video"
//                     onClick={() => setSelectedImage(image.src)}
//                   >
//                     <ImageWithFallback
//                       src={image.src}
//                       alt={image.caption}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                       <p className="text-white p-4">{image.caption}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>

//         {/* Lightbox */}
//         {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//             onClick={() => setSelectedImage(null)}
//           >
//             <div className="relative max-w-5xl w-full">
//               <button
//                 className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300"
//                 onClick={() => setSelectedImage(null)}
//               >
//                 ×
//               </button>
//               <ImageWithFallback
//                 src={selectedImage}
//                 alt="Gallery image"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import { useState, useEffect, Fragment } from "react";
import type { FC } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Assuming these come from your UI library like shadcn/ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// --- IMAGE IMPORTS ---
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.jpg";
import img3 from "../assets/img-3.jpg";
import img4 from "../assets/img-4.jpg";
import img5 from "../assets/img-5.jpg";
import img6 from "../assets/img-6.jpg";
import img7 from "../assets/img-7.jpg";
import img8 from "../assets/img-8.jpg";
import img9 from "../assets/img-9.jpg";
import img10 from "../assets/img-10.jpg";
import img11 from "../assets/img-11.jpg";
import img12 from "../assets/img-12.jpg";
import img13 from "../assets/img-13.jpg";
import img14 from "../assets/img-14.jpg";
import img15 from "../assets/img-15.jpg";
import img16 from "../assets/img-16.jpg";
import img17 from "../assets/img-17.jpg";
import img18 from "../assets/img-18.jpg";
import img19 from "../assets/img-19.jpg";

// --- TYPES ---
type GalleryImage = {
  src: string;
  caption: string;
};
type GalleryData = {
  [key: string]: GalleryImage[];
};

// --- IMAGE DATA ---
const galleryImages: GalleryData = {
  "Past Marathons": [
    { src: img1, caption: "Kicking off the 2024 marathon." },
    { src: img2, caption: "Runners on the open road." },
    { src: img3, caption: "The lead pack pushing the limits." },
    { src: img4, caption: "Crossing the finish line." },
    { src: img5, caption: "Energy of the starting line crowd." },
    { src: img6, caption: "A moment of triumph at the finish." },
  ],
  "Training Days": [
    { src: img7, caption: "Early morning group training." },
    { src: img8, caption: "Pre-run warm-ups." },
    { src: img9, caption: "Hill sprints for endurance." },
    { src: img10, caption: "Runners training rain or shine." },
    { src: img11, caption: "Post-run cooldown." },
  ],
  "Team Events": [
    { src: img12, caption: "The cycling team leading the charge." },
    { src: img13, caption: "Celebrating teamwork." },
    { src: img14, caption: "Corporate partners showing support." },
    { src: img15, caption: "Community fun run." },
  ],
  "Behind the Scenes": [
    { src: img16, caption: "Volunteers at a hydration station." },
    { src: img17, caption: "Setting up the course before sunrise." },
    { src: img18, caption: "Medical team ready to support." },
    { src: img19, caption: "Race kit distribution day." },
  ],
};

// --- HELPER COMPONENT ---
const ImageWithFallback: FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

// =================================================================
// GALLERY COMPONENT
// =================================================================
export default function Gallery() {
  const [activeTab, setActiveTab] = useState("Past Marathons");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const activeImages = galleryImages[activeTab] || [];
  const isModalOpen = selectedImageIndex !== null;
  const currentImage = isModalOpen ? activeImages[selectedImageIndex] : null;

  // --- Modal Navigation ---
  const handleNext = () => {
    if (isModalOpen) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex! + 1) % activeImages.length
      );
    }
  };

  const handlePrev = () => {
    if (isModalOpen) {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex! - 1 + activeImages.length) % activeImages.length
      );
    }
  };

  const handleClose = () => setSelectedImageIndex(null);

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, activeImages.length]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* ... Header ... */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Event Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Relive the moments of triumph, determination, and community spirit.
          </p>
        </div>

        {/* --- Tabs & Image Grid --- */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 sm:grid-cols-4 mb-8 h-auto">
            {Object.keys(galleryImages).map((category) => (
              <TabsTrigger key={category} value={category} className="h-10">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(galleryImages).map(([category, images]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={`${category}-${index}`}
                    className="group cursor-pointer overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* ================================================================= */}
        {/* NEW & IMPROVED MODAL (LIGHTBOX)                                   */}
        {/* ================================================================= */}
        {isModalOpen && (
          // Backdrop, closes modal when clicked
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 animate-fade-in"
            onClick={handleClose}
          >
            {/* Modal Container: prevents backdrop click from closing when clicking inside */}
            <div
              className="relative flex flex-col items-center max-w-full max-h-full bg-black/70 rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Stop propagation here
            >
              {/* Image Stage */}
              <div className="flex items-center justify-center w-full max-w-full max-h-[85vh] p-2 md:p-4">
                {currentImage && (
                  <Fragment key={currentImage.src}>
                    <ImageWithFallback
                      src={currentImage.src}
                      alt={currentImage.caption}
                      // Use max-w/h-full and object-contain to ensure image fits
                      className="max-w-full max-h-full object-contain rounded-md animate-scale-in"
                    />
                  </Fragment>
                )}
              </div>

              {/* Info Panel: Caption and Counter */}
              <div className="flex-shrink-0 p-4 text-center text-white w-full max-w-5xl bg-black/70 mt-auto">
                <p className="text-lg font-medium">{currentImage?.caption}</p>
                <p className="text-sm text-white/60 mt-1">
                  {selectedImageIndex + 1} / {activeImages.length}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors hidden sm:block"
                aria-label="Previous image"
              >
                <ChevronLeft size={30} />
              </button>
              {/* Prev Button for small screens (more compact) */}
              <button
                onClick={handlePrev}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors sm:hidden"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors hidden sm:block"
                aria-label="Next image"
              >
                <ChevronRight size={30} />
              </button>
              {/* Next Button for small screens (more compact) */}
              <button
                onClick={handleNext}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors sm:hidden"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
