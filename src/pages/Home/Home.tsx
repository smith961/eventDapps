import { Link } from "react-router-dom";
import RetroGrid from "@/components/ui/retro-grid"; // RetroGrid animation
import EventList from "@/components/EventList/EventCard";
import { MarqueeDemo } from "@/components/Marquee/Marquee";
import UpcomingEvents from "@/components/UpcomingEvent/UpcomingEvents";
import {useAccount } from 'wagmi'
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FaGlobe, FaSearch } from "react-icons/fa";


const Home = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-3 overflow-hidden bg-background">
        <div className="text-center">
          {/* Heading with the last two words in purple */}
          <h1 className="-mt-32 pt-36 text-5xl font-bold text-black md:text-8xl">
            Welcome to the ultimate event experience on{" "}
            <span className="text-purple-600">Eventos platform</span>
          </h1>

          {/* Updated Description */}
          <p className="mt-4 text-lg text-slate-700 md:text-xl">
            Discover, create, and manage events effortlessly with the best event solution built just for you.
          </p>

         

          {/* Buttons */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <Link
              to="/events"
              className="flex items-center justify-center px-6 py-2 text-white rounded-lg bg-slate-500 hover:bg-slate-500"
            >
              <FaSearch className="mr-2" />
              Browse Events
            </Link>
            {
              address ? (
                <Link
              to="/profile"
              className="px-6 py-2 text-white rounded-lg bg-slate-900 hover:bg-gray-600"
            >
              My Profile
            </Link>
              ) : (
                 <button
              onClick={openConnectModal}
              className="flex items-center px-4 py-2 text-white transition bg-black rounded-lg shadow-lg hover:bg-gray-800"
            >
              <FaGlobe className="mr-2 " />
              <span className=" md:inline">Connect Wallet</span>{" "}
              {/* Hide text on mobile */}
            </button>
              )
             }
          </div>
        </div>

        {/* RetroGrid Component (Animation) */}
        <RetroGrid />
      </div>

      {/* Latest Events Section */}
      <div className="container p-4 mx-auto my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Events</h2>
          <Link
            to="/events"
            className="text-blue-600 hover:underline"
          >
            See All
          </Link>
        </div>

        {/* Event List (limited to 3) */}
        <EventList limit={4} edit={false} />
      </div>

      {/* Upcoming events  */}
      <UpcomingEvents />

      {/* Marquee Section  */}
      <MarqueeDemo />
    </div>
  );
};

export default Home;
