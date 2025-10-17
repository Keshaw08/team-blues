// import { Calendar, User, ArrowRight } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { ImageWithFallback } from "./figma/ImageWithFallback";

// const newsArticles = [
//   {
//     title: "Marathon Training Tips: How to Prepare for Race Day",
//     excerpt:
//       "Expert advice on building endurance, preventing injuries, and optimizing your training schedule for peak performance.",
//     date: "October 10, 2025",
//     author: "Coach Rajesh Kumar",
//     category: "Training",
//     image:
//       "https://images.unsplash.com/photo-1586161659971-eba80f40b31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3JvdXAlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjA2NzQ2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
//   },
//   {
//     title: "Nutrition Guide for Marathon Runners",
//     excerpt:
//       "Learn what to eat before, during, and after your marathon to maximize energy and recovery.",
//     date: "October 5, 2025",
//     author: "Dr. Priya Sharma",
//     category: "Nutrition",
//     image:
//       "https://images.unsplash.com/photo-1652191090258-5a2df9ad6723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MDY3Nzk5NHww&ixlib=rb-4.1.0&q=80&w=1080",
//   },
//   {
//     title: "Team Blues Announces New Training Program",
//     excerpt:
//       "Join our comprehensive 12-week training program designed to prepare you for marathon success.",
//     date: "September 28, 2025",
//     author: "Team Blues Admin",
//     category: "Announcement",
//     image:
//       "https://images.unsplash.com/photo-1524646349956-1590eacfa324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMGZpbmlzaCUyMGxpbmV8ZW58MXx8fHwxNzYwNjYzODMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//   },
//   {
//     title: "Success Stories: Meet Our Marathon Champions",
//     excerpt:
//       "Inspiring stories from runners who achieved their personal bests with Team Blues.",
//     date: "September 20, 2025",
//     author: "Sarah Johnson",
//     category: "Stories",
//     image:
//       "https://images.unsplash.com/photo-1748430788520-986bb40be40b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwcmFjZSUyMGNyb3dkfGVufDF8fHx8MTc2MDY2MzgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
//   },
// ];

// export default function News() {
//   return (
//     <section id="news" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mb-4">Latest News</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Stay updated with the latest news, tips, and announcements from Team
//             Blues.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {newsArticles.map((article, index) => (
//             <Card
//               key={index}
//               className="hover:shadow-xl transition-all duration-300 overflow-hidden group"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <ImageWithFallback
//                   src={article.image}
//                   alt={article.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <Badge className="absolute top-4 left-4">
//                   {article.category}
//                 </Badge>
//               </div>
//               <CardHeader>
//                 <CardTitle className="line-clamp-2">{article.title}</CardTitle>
//                 <CardDescription className="flex items-center gap-4 text-xs">
//                   <span className="flex items-center gap-1">
//                     <Calendar size={14} />
//                     {article.date}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <User size={14} />
//                     {article.author}
//                   </span>
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 line-clamp-3 mb-4">
//                   {article.excerpt}
//                 </p>
//                 <Button variant="ghost" className="group/btn p-0 h-auto">
//                   Read More
//                   <ArrowRight
//                     className="ml-2 group-hover/btn:translate-x-1 transition-transform"
//                     size={16}
//                   />
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* News Ticker */}
//         <div className="bg-blue-600 text-white py-4 rounded-lg overflow-hidden">
//           <div className="flex items-center gap-4">
//             <div className="animate-scroll whitespace-nowrap">
//               <span className="inline-block px-8">
//                 🏃 Early bird registration closing soon! Save 20% on your entry
//                 fee.
//               </span>
//               <span className="inline-block px-8">
//                 🎉 New cycling category added to the marathon lineup!
//               </span>
//               <span className="inline-block px-8">
//                 💪 Free training sessions every Saturday at 6 AM - Join us!
//               </span>
//               <span className="inline-block px-8">
//                 🏆 Special prizes for top finishers in each category!
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             View All News
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }


import { Calendar, User, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { FC } from "react"; // Import FC for typing

// --- IMPORT THE NEWSPAPER IMAGES ---
import newsBhaskar from '../assets/news-3.jpg';
import newsPatrika from '../assets/news-1.jpg';
import newsHukmnama from '../assets/news-2.jpg';
import preEventPhoto from '../assets/img-1.jpg'; // Using this as a generic photo

// --- HELPER COMPONENT (for type safety) ---
const ImageWithFallback: FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
};


const newsArticles = [
  // --- NEW ARTICLES FROM YOUR SCREENSHOTS ---
  {
    title: "Nagaur to Host its First-Ever 42.195km Marathon on Oct 19",
    excerpt:
      "Dainik Bhaskar reports on the historic marathon organized by Team Blues, detailing the four race categories and the route finishing at Butati Dham.",
    date: "October 17, 2025",
    author: "Dainik Bhaskar",
    category: "Event Coverage",
    image: newsBhaskar,
  },
  {
    title: "Registrations Cross 126 for Inaugural Nagaur-Butati Marathon",
    excerpt:
      "Patrika highlights the growing excitement with 126 registrations from ages 16 to 52, as the event prepares to send a strong message of health and fitness.",
    date: "October 17, 2025",
    author: "Patrika News",
    category: "Community",
    image: newsPatrika,
  },
  {
    title: "An Inspirational Journey from Nahar Mata Mandir to Butati Dham",
    excerpt:
      "Hukmnama Samachar details the marathon as an 'inspirational journey', calling for widespread community participation in running, walking, and cycling.",
    date: "October 17, 2025",
    author: "Hukmnama Samachar",
    category: "Route Details",
    image: newsHukmnama,
  },
    {
    title: "Organizers Finalize Preparations for the Big Day",
    excerpt:
      "A glimpse of the organizing committee and key community members during a meeting to finalize the arrangements for the upcoming marathon.",
    date: "October 16, 2025",
    author: "Team Blues Admin",
    category: "Preparation",
    image: preEventPhoto,
  },
];

export default function News() {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">In The News</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest media coverage and announcements for the Nagaur Marathon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newsArticles.map((article, index) => (
            <Card
              key={index}
              className="flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3">{article.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg leading-snug">{article.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {article.author}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                  {article.excerpt}
                </p>
                <Button variant="link" className="group/btn p-0 h-auto self-start text-blue-600">
                  Read More
                  <ArrowRight
                    className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                    size={16}
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}