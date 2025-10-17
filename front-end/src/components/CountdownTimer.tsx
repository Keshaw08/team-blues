import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Set marathon date to 3 months from now
  const marathonDate = new Date('2025-10-19T06:00:00');
  
  const calculateTimeLeft = () => {
    const difference = marathonDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-orange-500 py-8 px-4">
      <div className="container mx-auto text-center text-white">
        <h3 className="mb-6">Marathon Event Starts In:</h3>
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
              <div className="text-4xl md:text-5xl mb-2">{item.value.toString().padStart(2, '0')}</div>
              <div className="text-sm uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
