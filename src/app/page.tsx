"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the fixed launch date: February 20, 2025, 00:00:00
  const targetDate = new Date("2025-02-20T00:00:00Z").getTime();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    };

    // Update the countdown every second
    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Run immediately to avoid delay

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl md:text-8xl font-bold text-center mb-8 animate-pulse">
        Something Big is Coming!
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
          <div key={label} className="text-center">
            <span className="text-4xl md:text-6xl font-bold">
              {Object.values(timeLeft)[i]}
            </span>
            <span className="block text-sm md:text-lg">{label}</span>
          </div>
        ))}
      </div>

      <button
        className="px-8 py-4 bg-white text-purple-900 font-bold text-lg rounded-full hover:bg-purple-100 transition-all"
        onClick={() => alert("Stay tuned for something amazing!")}
      >
        Notify Me
      </button>

      <footer className="mt-8 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} FOTR Africa. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
