import EventList from "@/components/EventList/EventCard";


const Events = () => {
  return (
    <div className="container flex flex-col items-center min-h-screen px-4 mx-auto my-24 mb-24">
      <h1 className="mb-8 text-2xl font-bold ">All Events</h1>
      <EventList /> {/* Display all events */}
    </div>
  );
};

export default Events;
