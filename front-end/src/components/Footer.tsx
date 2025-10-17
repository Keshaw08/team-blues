// import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

// export default function Footer() {
//   const quickLinks = [
//     { label: 'Home', id: 'home' },
//     { label: 'About Us', id: 'about' },
//     { label: 'Marathon Details', id: 'marathon' },
//     { label: 'Gallery', id: 'gallery' },
//     { label: 'Contact', id: 'contact' },
//   ];

//   const legalLinks = [
//     { label: 'Privacy Policy', url: '#' },
//     { label: 'Terms & Conditions', url: '#' },
//   ];

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* About */}
//           <div>
//             <h3 className="mb-4 text-white">Team Blues</h3>
//             <p className="text-gray-400 text-sm mb-4">
//               Empowering individuals to achieve their fitness goals through marathons and community support.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
//               >
//                 <Facebook size={18} />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Instagram"
//                 className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-colors"
//               >
//                 <Instagram size={18} />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors"
//               >
//                 <Twitter size={18} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.id}>
//                   <button
//                     onClick={() => scrollToSection(link.id)}
//                     className="text-gray-400 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h4 className="mb-4 text-white">Legal</h4>
//             <ul className="space-y-2">
//               {legalLinks.map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.url}
//                     className="text-gray-400 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="mb-4 text-white">Contact</h4>
//             <ul className="space-y-3">
//               <li className="flex items-center gap-3 text-gray-400 text-sm">
//                 <Mail size={16} className="shrink-0" />
//                 <span>info@teamblues.com</span>
//               </li>
//               <li className="flex items-center gap-3 text-gray-400 text-sm">
//                 <Phone size={16} className="shrink-0" />
//                 <span>+91 96490 54767</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 pt-8 text-center">
//           <p className="text-gray-400 text-sm">
//             © {new Date().getFullYear()} Team Blues. All rights reserved. Built with passion for fitness.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, Users } from "lucide-react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          "https://api.countapi.xyz/hit/teamblues.in/visits"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVisitorCount(data.value);
      } catch (error) {
        console.error("Could not fetch visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Marathon Details", id: "marathon" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms & Conditions", url: "#" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="mb-4 text-white">Team Blues</h3>
            <p className="text-gray-400 text-sm mb-4">
              Empowering individuals to achieve their fitness goals through
              marathons and community support.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links, Legal, and Contact sections remain the same... */}
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="shrink-0" />
                <span>info@teamblues.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+91 96490 54767</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center space-y-4">
          {/* Visitor Counter */}
          {visitorCount !== null && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Users size={16} />
              <span className="text-sm font-medium">
                Visitors: {visitorCount.toLocaleString()}
              </span>
            </div>
          )}

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Team Blues. All rights reserved. Built
            with passion for fitness.
          </p>
        </div>
      </div>
    </footer>
  );
}
