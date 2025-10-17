// import { Target, Heart, Users, Award, Mail, Phone, Code } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { ImageWithFallback } from './figma/ImageWithFallback';

// const teamMembers = [
//   {
//     name: 'Rajesh Kumar',
//     role: 'Head Coach',
//     bio: '15+ years of marathon training experience. Former national level athlete with expertise in endurance training.',
//     image: 'https://images.unsplash.com/photo-1750698545009-679820502908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb2FjaCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDU3NTAwNnww&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     name: 'Priya Sharma',
//     role: 'Nutrition Expert',
//     bio: 'Certified sports nutritionist specializing in endurance athlete nutrition and performance optimization.',
//     image: 'https://images.unsplash.com/photo-1672819030217-a1ad8307e629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXRyaXRpb24lMjBleHBlcnR8ZW58MXx8fHwxNzYwNjgwMTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     name: 'Amit Patel',
//     role: 'Event Coordinator',
//     bio: 'Organized 50+ successful marathons across India. Expert in logistics and event management.',
//     image: 'https://images.unsplash.com/photo-1706381077572-24b367980d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZXZlbnQlMjBjb29yZGluYXRvcnxlbnwxfHx8fDE3NjA2ODAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     name: 'Sneha Reddy',
//     role: 'Community Manager',
//     bio: 'Building and nurturing our running community. Marathon finisher and passionate about fitness for all.',
//     image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczOTU3MzAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     name: 'Vikram Singh',
//     role: 'Fitness Trainer',
//     bio: 'Specialized in strength and conditioning for runners. Certified personal trainer with 10+ years experience.',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzM5NTczMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     name: 'Anita Desai',
//     role: 'Physiotherapist',
//     bio: 'Sports injury prevention and rehabilitation specialist. Keeping our runners healthy and injury-free.',
//     image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczOTU3MzAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
//   },
// ];

// const testimonials = [
//   {
//     quote: "Team Blues transformed my fitness journey. I went from a couch potato to completing my first marathon!",
//     author: "Arjun Mehta",
//     role: "Marathon Finisher 2024",
//   },
//   {
//     quote: "The community support and expert coaching at Team Blues is unmatched. Highly recommended!",
//     author: "Kavita Nair",
//     role: "Half Marathon Champion",
//   },
//   {
//     quote: "Best decision I made was joining Team Blues. The training program is comprehensive and motivating.",
//     author: "Rahul Verma",
//     role: "5K Regular Runner",
//   },
// ];

// const values = [
//   {
//     icon: Target,
//     title: 'Fitness for All',
//     description: 'We believe everyone deserves access to quality fitness training and community support.',
//   },
//   {
//     icon: Heart,
//     title: 'Breaking Barriers',
//     description: 'Empowering individuals to push beyond their limits and achieve their personal best.',
//   },
//   {
//     icon: Users,
//     title: 'Community First',
//     description: 'Building a supportive community where everyone motivates and inspires each other.',
//   },
//   {
//     icon: Award,
//     title: 'Inspiring Action',
//     description: 'Encouraging active lifestyles through engaging events and meaningful challenges.',
//   },
// ];

// const milestones = [
//   { year: '2010', title: 'Founded', description: 'Team Blues established with 50 members' },
//   { year: '2015', title: 'First Marathon', description: 'Organized our first city-wide marathon event' },
//   { year: '2018', title: '1000+ Members', description: 'Reached milestone of 1000 active members' },
//   { year: '2020', title: 'Virtual Events', description: 'Adapted to virtual marathons during pandemic' },
//   { year: '2023', title: 'National Recognition', description: 'Awarded Best Fitness Club in India' },
//   { year: '2024', title: '5000+ Members', description: 'Growing community of passionate runners' },
// ];

// export default function AboutUs() {
//   return (
//     <section id="about" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <h2 className="mb-6">About Team Blues</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             More than just a fitness club – we're a family united by the love of running and the pursuit of excellence.
//           </p>
//         </div>

//         {/* Main About Section */}
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//           <div>
//             <h3 className="mb-6">Our Story</h3>
//             <p className="text-gray-600 mb-4">
//               Team Blues was born in 2010 from a simple idea: to make fitness accessible to everyone. What started as a small group of passionate runners meeting in the park has grown into one of India's most vibrant fitness communities.
//             </p>
//             <p className="text-gray-600 mb-4">
//               Today, with over 5,000 active members across multiple cities, we've helped thousands transform their lives through running. Our philosophy is simple – whether you're running your first 5K or gunning for a Boston Marathon qualifier, Team Blues provides the training, support, and community you need to succeed.
//             </p>
//             <p className="text-gray-600 mb-4">
//               We organize marathons across 5 categories – 5km, 10km, half marathon (21km), full marathon (42.195km), and cycling events. Each event is designed to challenge and inspire participants at every level.
//             </p>
//             <p className="text-gray-600">
//               Our mission extends beyond races. We're committed to promoting healthy lifestyles, building strong communities, and proving that with dedication and the right support, anyone can achieve their fitness dreams.
//             </p>
//           </div>
//           <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
//             <ImageWithFallback
//               src="https://images.unsplash.com/photo-1586161659971-eba80f40b31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3JvdXAlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjA2NzQ2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
//               alt="Team Blues training"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Journey Timeline */}
//         <div className="mb-20">
//           <h3 className="text-center mb-12">Our Journey</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {milestones.map((milestone, index) => (
//               <Card key={index} className="text-center hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white">
//                     {milestone.year}
//                   </div>
//                   <CardTitle className="text-sm">{milestone.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 text-xs">{milestone.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Our Values */}
//         <div className="mb-20">
//           <h3 className="text-center mb-12">Our Values</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {values.map((value, index) => (
//               <Card key={index} className="text-center hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <value.icon className="text-blue-600" size={32} />
//                   </div>
//                   <CardTitle>{value.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 text-sm">{value.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Team Members */}
//         <div className="mb-20">
//           <h3 className="text-center mb-12">Meet Our Team</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => (
//               <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
//                 <CardHeader>
//                   <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
//                     <ImageWithFallback
//                       src={member.image}
//                       alt={member.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <CardTitle>{member.name}</CardTitle>
//                   <CardDescription>{member.role}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 text-sm">{member.bio}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 shadow-lg">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center gap-2 mb-4">
//               <Code className="text-blue-600" size={28} />
//               <h3 className="text-2xl">Website Developed & Maintained By</h3>
//             </div>
//           </div>

//           <Card className="max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-shadow">
//             <CardContent className="pt-6">
//               <div className="flex flex-col md:flex-row items-center gap-6">
//                 <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
//                   <ImageWithFallback
//                     src="https://images.unsplash.com/photo-1715029005043-e88d219a3c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA2ODAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
//                     alt="Developer"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="flex-1 text-center md:text-left">
//                   <h4 className="text-2xl mb-2">Your Name</h4>
//                   <p className="text-gray-600 mb-4">Full Stack Web Developer</p>

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 justify-center md:justify-start">
//                       <Mail className="text-blue-600" size={18} />
//                       <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-700 transition-colors">
//                         your.email@example.com
//                       </a>
//                     </div>
//                     <div className="flex items-center gap-2 justify-center md:justify-start">
//                       <Phone className="text-blue-600" size={18} />
//                       <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-700 transition-colors">
//                         +91 98765 43210
//                       </a>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mt-4">
//                     Specialized in creating modern, responsive web applications using React, TypeScript, and Tailwind CSS.
//                     Passionate about building user-friendly interfaces that bring ideas to life.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }
import type { FC } from "react";
import {
  HeartPulse,
  Users,
  Sprout,
  Dumbbell,
  Zap,
  Gamepad2,
  Sun,
  Moon,
  Mail,
  Phone,
  Code,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

// --- IMAGE IMPORTS FROM ASSETS ---
import teamMember1 from "../assets/sur.jpg";
import teamMember2 from "../assets/ram.jpg";
import teamMember3 from "../assets/raj.jpg";
import teamMember4 from "../assets/ash.jpg";
import developerPhoto from "../assets/kes.jpg";
import heroImage from "../assets/img-2.jpg";

// --- HELPER COMPONENT (for type safety) ---
const ImageWithFallback: FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

// =================================================================
// DATA
// =================================================================

const teamMembers = [
  {
    name: "Suresh Kumar Soni",
    role: "Founder & Head Coach",
    image: teamMember1,
  },
  { name: "Ramprasad Kashania", role: "Event Coordinator", image: teamMember2 },
  { name: "Dr. Rajveer Sirohi", role: "Community Manager", image: teamMember3 },
  { name: "Ashok Sharma", role: "Yoga & Wellness Coach", image: teamMember4 },
];

const clubActivities = [
  {
    icon: Zap,
    title: "Running & Cardio",
    description: "High-energy group runs to build stamina and speed.",
  },
  {
    icon: Dumbbell,
    title: "Gym & Strength",
    description: "Focused strength training sessions for a powerful physique.",
  },
  {
    icon: HeartPulse,
    title: "Yoga & Flexibility",
    description: "Calming yoga to improve flexibility and mental peace.",
  },
  {
    icon: Sprout,
    title: "Tree Plantation",
    description: "Giving back to nature with our community green initiatives.",
  },
  {
    icon: Gamepad2,
    title: "Fun & Games",
    description: "Engaging in fun games and activities to build team spirit.",
  },
  {
    icon: Users,
    title: "Social Events",
    description: "Connecting with members through various social gatherings.",
  },
];

// =================================================================
// ABOUT US COMPONENT
// =================================================================
export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* --- Hero Section --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About Team Blues
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A passionate community dedicated to fitness, friendship, and making
            a positive impact, every single day. We are open to everyone, at any
            age.
          </p>
        </div>

        {/* --- Who We Are Section --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-80 md:h-full rounded-lg overflow-hidden shadow-xl">
            <ImageWithFallback
              src={heroImage}
              alt="Team Blues training together"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our Commitment: Fitness for All
            </h3>
            <p className="text-gray-600 mb-4">
              Team Blues is more than a club; it's a daily movement. We are a
              social fitness family that believes in the power of consistency
              and community. Whether you're a seasoned athlete or just starting
              your journey, you have a place with us.
            </p>
            <p className="text-gray-600">
              Our philosophy is simple: show up and support each other. We
              welcome all ages and fitness levels to join our diverse range of
              activities, designed to strengthen both body and spirit.
            </p>
          </div>
        </div>

        {/* --- Daily Activities Section --- */}
        <div className="mb-20">
          <h3 className="text-center text-3xl font-bold mb-12">
            Our Daily Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <activity.icon className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Meet the Core Team Section --- */}
        <div className="mb-20">
          <h3 className="text-center text-3xl font-bold mb-12">
            Meet Our Core Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-none">
                <CardContent className="p-0">
                  {/* UNIFORM CIRCULAR IMAGE CONTAINER */}
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 shadow-lg group">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  {/* <p className="text-blue-600 font-medium">{member.role}</p> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* --- Join Us CTA Section --- */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 md:p-12 text-center mb-20">
          <h3 className="text-3xl font-bold mb-4">Join The Movement</h3>
          <p className="max-w-2xl mx-auto mb-6">
            We meet every day, without fail. Your fitness journey is just one
            step away. Come and be a part of our energetic family!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Sun size={24} /> Morning Session: 4:00 AM
            </div>
            <div className="flex items-center gap-2">
              <Moon size={24} /> Evening Session: 6:00 PM
            </div>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get In Touch
          </Button>
        </div>

        {/* --- DEVELOPER SECTION --- */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Code size={24} />
              <h3 className="text-2xl font-semibold">
                Website Developed & Maintained By
              </h3>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                  <ImageWithFallback
                    src={developerPhoto}
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-1">Keshaw Soni</h4>
                  <p className="text-blue-600 font-medium mb-4">
                    Full Stack Web Developer
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Mail className="text-gray-500" size={18} />
                      <a
                        href="mailto:keshawsoni08@gmail.com"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        keshawsoni08@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Phone className="text-gray-500" size={18} />
                      <a
                        href="tel:+919649054767"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        +91 96490 54767
                      </a>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">
                    Specialized in creating modern, responsive web applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
