import React, { useState, useEffect } from "react";

// Props definition for the Countdown component
interface CountdownProps {
  endDate: string; // The end date as a string (e.g., "2023-12-31T23:59:59")
}

// Helper function to calculate time left
const calculateTimeLeft = (endDate: string) => {
  const end = new Date(endDate).getTime(); // Convert the end date to milliseconds
  const now = Date.now(); // Current time in milliseconds
  const difference = end - now;

  // If the end date is in the past, return null (nothing to display)
  if (difference <= 0) {
    return null;
  }

  // Calculate the remaining time in days, hours, minutes, and seconds
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

// Countdown component
const Countdown: React.FC<CountdownProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [endDate]);

  // If the end date is in the past or timeLeft is null, return nothing
  if (!timeLeft) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <div className="text-lg font-bold">{timeLeft.days}</div>
        <div className="text-xs">Days</div>
      </div>
      <div>
        <div className="text-lg font-bold">{timeLeft.hours}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div>
        <div className="text-lg font-bold">{timeLeft.minutes}</div>
        <div className="text-xs">Minutes</div>
      </div>
      <div>
        <div className="text-lg font-bold">{timeLeft.seconds}</div>
        <div className="text-xs">Seconds</div>
      </div>
    </div>
  );
};

export default Countdown;
