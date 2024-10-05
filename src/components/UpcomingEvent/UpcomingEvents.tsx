import { events } from "@/data";
import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa"; 

const UpcomingEvents: React.FC = () => {
  return (
    <div className="container px-4 mx-auto my-16">
      {/* Title and Subtitle */}
      <div className="mb-8 text-start">
        <h2 className="text-3xl font-bold">Upcoming Events</h2>
        <p className="mt-3 text-gray-600">Events in the next 3 days</p>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {events.slice(0, 4).map((event, index) => (
           <div
            key={event.id}
            className="flex flex-col md:flex-row"
            data-aos="fade-up" // AOS animation: Fade up effect on scroll
            data-aos-delay={`${index * 200}`} // Delay each card by 200ms
          >
            {/* Image with Hover Scale Effect */}
            <div className="relative overflow-hidden rounded-lg md:w-1/3">
              <img
                src={event.image}
                alt={event.name}
                className="object-cover w-full h-48 transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Event Info Box */}
            <div className="p-6 mt-4 bg-white rounded-lg shadow-lg md:mt-0 md:ml-4 md:w-2/3">
              {/* Date and Time in a Rounded Box */}
              <div className="flex items-center justify-between w-full p-2 mb-4 text-gray-700 border rounded-lg lg:w-1/2 border-slate-400">
                <div className="flex items-center pr-6 border-r border-r-slate-400">
                  <FaCalendarAlt className="mr-2" />
                  <span>{event.date.split(",")[0]}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{event.date.split(",")[1]}</span>
                </div>
              </div>

              {/* Event Title */}
              <h3 className="mb-2 text-xl font-bold">{event.name}</h3>

              {/* Location */}
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
