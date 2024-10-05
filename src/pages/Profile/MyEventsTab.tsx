import { useEffect, useState } from "react";
import EventModal from "../../components/Modal/EventModal";

import { FaPlusCircle } from "react-icons/fa";
import { events as initialEvents } from "@/data";
import EventList from "@/components/EventList/EventCard";
import { useAccount } from "wagmi";
import { getAllMyNft } from "@/utils/alchemyUtils";

const MyEventsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myEvents, setMyEvents] = useState(initialEvents); // State to manage the list of events
  const { address } = useAccount();
  // Function to add a new event to the state
  const addEvent = (newEvent: any) => {
    setMyEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  useEffect(() => {
    // Fetch all events from the blockchain
    if (address) {
      getAllMyNft(address as string).then((data) => console.log(data));
    }
  }, [address]);

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-2xl font-bold">My Events</h1>
        <button
          className="flex items-center justify-center px-4 py-2 text-white rounded-lg btn bg-slate-800"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlusCircle className="mr-2 text-xl" />
          Create Event
        </button>
        {/* Event Modal for creating new events */}
        {isModalOpen && (
          <EventModal
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            addEvent={addEvent} // Pass addEvent to the modal
          />
        )}
      </div>

      {/* Render the EventList with the events */}
      <EventList events={myEvents} grid={3} edit={true} limit={5} />
    </div>
  );
};

export default MyEventsTab;
