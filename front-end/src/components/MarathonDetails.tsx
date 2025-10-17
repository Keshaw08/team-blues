// import { Footprints, Zap, Trophy, Mountain, Bike } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';

// const raceCategories = [
//   {
//     icon: Footprints,
//     distance: '5km',
//     name: 'Fun Run',
//     difficulty: 'Beginner',
//     startTime: '7:00 AM',
//     description: 'Perfect for beginners and families. A fun, energetic start to your fitness journey!',
//     color: 'bg-green-500',
//   },
//   {
//     icon: Zap,
//     distance: '10km',
//     name: 'Sprint Challenge',
//     difficulty: 'Intermediate',
//     startTime: '7:15 AM',
//     description: 'Push your limits with this exciting challenge for regular runners.',
//     color: 'bg-blue-500',
//   },
//   {
//     icon: Trophy,
//     distance: '21km',
//     name: 'Half Marathon',
//     difficulty: 'Advanced',
//     startTime: '6:30 AM',
//     description: 'The ultimate test of endurance for seasoned runners.',
//     color: 'bg-orange-500',
//   },
//   {
//     icon: Mountain,
//     distance: '42.195km',
//     name: 'Full Marathon',
//     difficulty: 'Expert',
//     startTime: '6:00 AM',
//     description: 'Conquer the legendary distance. Join the elite marathon runners!',
//     color: 'bg-red-500',
//   },
//   {
//     icon: Bike,
//     distance: '42.195km',
//     name: 'Cycling Marathon',
//     difficulty: 'Advanced',
//     startTime: '6:45 AM',
//     description: 'Experience the thrill of marathon distance on two wheels.',
//     color: 'bg-purple-500',
//   },
// ];

// export default function MarathonDetails() {
//   return (
//     <section id="marathon" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mb-4">Marathon Details</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Choose your challenge! From beginners to elite athletes, we have a race for everyone.
//           </p>
//           <div className="mt-6 p-6 bg-blue-600 text-white rounded-lg inline-block">
//             <p className="text-sm uppercase tracking-wider mb-2">Event Date & Location</p>
//             <p className="mb-1">December 15, 2025</p>
//             <p>Central Park Sports Complex, Mumbai</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {raceCategories.map((race, index) => (
//             <Card
//               key={index}
//               className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-t-4"
//               style={{ borderTopColor: race.color.replace('bg-', '#') }}
//             >
//               <CardHeader>
//                 <div className={`${race.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
//                   <race.icon className="text-white" size={32} />
//                 </div>
//                 <CardTitle>{race.distance}</CardTitle>
//                 <CardDescription>{race.name}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Difficulty:</span>
//                     <Badge variant={race.difficulty === 'Beginner' ? 'default' : 'secondary'}>
//                       {race.difficulty}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Start Time:</span>
//                     <span>{race.startTime}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-3">{race.description}</p>
//                   <Button className="w-full mt-4" variant="outline">
//                     Learn More
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center">
//           <Button
//             size="lg"
//             className="bg-blue-600 hover:bg-blue-700"
//             onClick={() => {
//               const element = document.getElementById('contact');
//               if (element) element.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             Register for Your Race
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// // }
import {
  Footprints,
  Zap,
  Trophy,
  Mountain,
  Bike,
  Clock,
  MapPin,
  Flag,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

/* ===================== EVENT META ===================== */
const EVENT = {
  title: "Nagaur Marathon 2025",
  date: "October 19, 2025",
  city: "Nagaur (Rajasthan)",
  commonFinish: "Chaturdas Ji Mandir, Butati",
  kitExpo: {
    when: "Oct 18, 2025 • 10:00 AM – 6:00 PM",
    where: "Govind Gopal Gaushala, Bagnada Inana (Nagaur)",
    note: "Government ID required. No race-day kit distribution.",
  },
  routeNotes:
    "Flat city-road course; traffic-controlled; hydration every 2 km; medical stations at 5 km intervals.",
};

/* ===================== CATEGORIES ===================== */
const raceCategories = [
  {
    icon: Footprints,
    distance: "5 km",
    name: "Fun Run",
    difficulty: "Beginner",
    startTime: "7:00 AM",
    description:
      "Perfect for beginners and families—no pressure, tons of cheer squads. Chip timing optional.",
    startPoint: "Kuchera Toll Naka (Kuchera)",
    finish: EVENT.commonFinish,
    bgClass: "bg-green-500",
    colorHex: "#22c55e",
  },
  {
    icon: Zap,
    distance: "10 km",
    name: "Sprint Challenge",
    difficulty: "Intermediate",
    startTime: "6:30 AM",
    description:
      "Great for regular runners aiming for a PB. Fully chip-timed with split mats.",
    startPoint: "Nimbdi Bypass Phanta (Kuchera)",
    finish: EVENT.commonFinish,
    bgClass: "bg-blue-500",
    colorHex: "#3b82f6",
  },
  {
    icon: Trophy,
    distance: "21.097 km",
    name: "Half Marathon",
    difficulty: "Advanced",
    startTime: "5:30 AM",
    description:
      "Signature distance with elite & amateur corrals, on-course pacers, and official timing.",
    startPoint: "Gothda Choraha",
    finish: EVENT.commonFinish,
    bgClass: "bg-orange-500",
    colorHex: "#f97316",
  },
  {
    icon: Mountain,
    distance: "42.195 km",
    name: "Full Marathon",
    difficulty: "Expert",
    startTime: "4:00 AM",
    description:
      "The crown event. Early start, gel stations, bike marshals, and medical support throughout.",
    startPoint: "Govind Gopal Gaushala, Bagnada Inana (Nagaur)",
    finish: EVENT.commonFinish,
    bgClass: "bg-red-500",
    colorHex: "#ef4444",
  },
  {
    icon: Bike,
    distance: "42.195 km",
    name: "Cycling Marathon",
    difficulty: "Advanced",
    startTime: "6:45 AM",
    description:
      "UCI-style rollout, helmet mandatory, support vehicle and hydration every ~7 km.",
    startPoint: "Govind Gopal Gaushala, Bagnada Inana (Nagaur)",
    finish: EVENT.commonFinish,
    bgClass: "bg-purple-500",
    colorHex: "#a855f7",
  },
];

const eventHighlights = [
  {
    icon: Calendar,
    label: "Event Date",
    value: EVENT.date,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: MapPin,
    label: "Location",
    value: EVENT.city,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Flag,
    label: "Common Finish Line",
    value: EVENT.commonFinish,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

/* ===================== COMPONENT ===================== */
export default function MarathonDetails() {
  return (
    <section id="marathon" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{EVENT.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your challenge! From beginners to elite athletes, we have a
            race for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-8">
          {eventHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`rounded-full p-4 mb-4 ${item.iconBg} ${item.iconColor}`}
              >
                <item.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
                {item.label}
              </h3>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Race cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {raceCategories.map((race, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-t-4"
              style={{ borderTopColor: race.colorHex }}
            >
              <CardHeader>
                <div
                  className={`${race.bgClass} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
                >
                  <race.icon className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl">{race.distance}</CardTitle>
                <CardDescription className="text-base">
                  {race.name}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <Badge
                      variant={
                        race.difficulty === "Beginner" ? "default" : "secondary"
                      }
                    >
                      {race.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Start Time</span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {race.startTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Start Point</span>
                    <span className="text-right">{race.startPoint}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Finish</span>
                    <span className="text-right">{race.finish}</span>
                  </div>

                  <p className="text-sm text-gray-600 pt-2">
                    {race.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kit Expo & Route Notes */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Race Kit Pickup</CardTitle>
              <CardDescription>{EVENT.kitExpo.where}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p className="mb-1">
                <Clock size={14} className="inline mr-2" />
                {EVENT.kitExpo.when}
              </p>
              <p className="opacity-80">{EVENT.kitExpo.note}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Route & Facilities</CardTitle>
              <CardDescription>What to expect on course</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              {EVENT.routeNotes}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 "
           onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeNJVOjnBAlkMTV47URue1G4eU1y1UOPmgiglA11IoULqRtPw/viewform?usp=dialog", "_blank")}
          >
            Register for Your Race
          </Button>
        </div>
      </div>
    </section>
  );
}
