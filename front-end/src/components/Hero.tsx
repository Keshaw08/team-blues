// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";
// import { ImageWithFallback } from "./figma/ImageWithFallback";

// const quotes = [
//   "Fit India, Hit India",
//   "Stronger Every Step",
//   "The Only Bad Workout is the One That Didn't Happen",
//   "Run to Build Your Strength, Mind, and Body",
//   "Your Pace, Your Race",
//   "योगः कर्मसु कौशलम् (Yogah Karmasu Kaushalam) - Yoga is Excellence in Action",
//   "शरीरमाद्यं खलु धर्मसाधनम् - Body is the First Instrument of Dharma",
//   "स्वस्थ शरीर में स्वस्थ मन का निवास होता है - A Healthy Mind Resides in a Healthy Body",
//   "दौड़ो, जीतो, और खुद को साबित करो - Run, Win, and Prove Yourself",
//   "हर कदम एक नई शुरुआत है - Every Step is a New Beginning",
// ];

// export default function Hero() {
//   const [currentQuote, setCurrentQuote] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentQuote((prev) => (prev + 1) % quotes.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const nextQuote = () => {
//     setCurrentQuote((prev) => (prev + 1) % quotes.length);
//   };

//   const prevQuote = () => {
//     setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
//   };

//   const scrollToMarathon = () => {
//     const element = document.getElementById("marathon");
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <section
//       id="home"
//       className="relative h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1759674804375-3d0c038a0a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMHJ1bm5lcnMlMjBhY3Rpb258ZW58MXx8fHwxNzYwNjEyMzg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
//           alt="Marathon runners in action"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-orange-900/60" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 text-center text-white">
//         <h1 className="mb-6 text-white">Run Your Best with Team Blues</h1>

//         {/* Quote Carousel */}
//         <div className="relative max-w-3xl mx-auto mb-8 h-24 flex items-center justify-center">
//           <button
//             onClick={prevQuote}
//             className="absolute left-0 p-2 hover:bg-white/20 rounded-full transition-colors"
//             aria-label="Previous quote"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <div className="px-16">
//             <p className="text-2xl md:text-3xl italic animate-fade-in">
//               "{quotes[currentQuote]}"
//             </p>
//           </div>

//           <button
//             onClick={nextQuote}
//             className="absolute right-0 p-2 hover:bg-white/20 rounded-full transition-colors"
//             aria-label="Next quote"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center gap-2 mb-8">
//           {quotes.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentQuote(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === currentQuote ? "bg-white w-8" : "bg-white/50"
//               }`}
//               aria-label={`Go to quote ${index + 1}`}
//             />
//           ))}
//         </div>

//         <Button
//           onClick={scrollToMarathon}
//           size="lg"
//           className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 shadow-lg hover:shadow-xl transition-all"
//         >
//           Register Now
//         </Button>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
//           <div className="w-1 h-3 bg-white rounded-full" />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slidesData = [
  {
    image:
      "https://images.unsplash.com/photo-1667781838690-5f32ea0ccea6?ixlib=rb-4.1.0&q=80&w=1920&auto=format&fit=crop",
    preTitle: "POWER YOUR STRIDE",
    quote: "Fit India, Hit India!",
    source: "Indian Slogan",
  },
  {
    image:
      "https://images.unsplash.com/photo-1719299246408-68fff9bdacbc?ixlib=rb-4.1.0&q=80&w=1920&auto=format&fit=crop",
    preTitle: "MIND & BODY",
    quote: "शरीरमाद्यं खलु धर्मसाधनम्",
    translation: "The body is the primary instrument of duty.",
    source: "Sanskrit Saying",
  },
  {
    image:
      "https://i.pinimg.com/1200x/b8/e5/81/b8e581144e220f992f59972b265f0439.jpg",
    preTitle: "EMBRACE THE CHALLENGE",
    quote: "दौड़ो, जीतो, और खुद को साबित करो",
    translation: "Run, win, and prove yourself.",
    source: "Hindi Motivation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524646349956-1590eacfa324?ixlib=rb-4.1.0&q=80&w=1920&auto=format&fit=crop",
    preTitle: "YOUR RACE, YOUR PACE",
    quote: "The only bad workout is the one that didn't happen.",
    source: "Fitness Mantra",
  },
];



// --- HERO SECTION ---
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slidesData[index];

  // const textVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  //   },
  //   exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
  // };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // const imageVariants = {
  //   hidden: { opacity: 0, scale: 1.1 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 1.5, ease: [0.4, 0.0, 0.2, 1] },
  //   },
  //   exit: {
  //     opacity: 0,
  //     scale: 1.1,
  //     transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] },
  //   },
  // };

  return (
    <section className="relative h-screen w-full bg-black text-white flex items-center overflow-hidden">
    
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={index}
            src={currentSlide.image}
            alt={currentSlide.source}
            // variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full object-cover blur-sm"
          />
        </AnimatePresence>
        {/* A more effective gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
     

      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              // variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <motion.p
                variants={childVariants}
                className="text-sm uppercase tracking-[0.2em] text-white/80"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
              >
                {currentSlide.preTitle}
              </motion.p>
              <motion.blockquote variants={childVariants}>
                <p
                  className="text-4xl md:text-5xl font-semibold leading-tight"
                  style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
                >
                  "{currentSlide.quote}"
                </p>
                {currentSlide.translation && (
                  <p
                    className="text-2xl md:text-3xl font-light text-white/90 mt-2"
                    style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
                  >
                    {currentSlide.translation}
                  </p>
                )}
              </motion.blockquote>
              <motion.cite
                variants={childVariants}
                className="block not-italic text-base tracking-widest text-white/80 pt-2"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
              >
                &mdash; {currentSlide.source.toUpperCase()}
              </motion.cite>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
