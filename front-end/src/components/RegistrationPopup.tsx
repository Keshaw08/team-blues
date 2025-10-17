import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export default function RegistrationPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // Show after 10 seconds

    const handleScroll = () => {
      if (window.scrollY > 1000 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const handleRegister = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg shadow-2xl p-6 max-w-sm relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X size={20} />
        </button>
        <h4 className="mb-2 text-white">Don't Miss Out!</h4>
        <p className="text-sm mb-4 text-white/90">
          Register now for the marathon and get 20% early bird discount!
        </p>
        <Button
          onClick={handleRegister}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
