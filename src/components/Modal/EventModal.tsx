import React, { useState } from "react";
import { FaTrash, FaBuilding, FaUpload, FaSpinner } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { uploadToPinata } from "@/utils/uploadToPinanta";
import { useWriteContract } from "wagmi";
import { ventura } from "@/constants/deployedContracts";
import { uploadNFT } from "@/utils/uploadNFT";
import toast from "react-hot-toast";

// DatePicker component for the Event Date
export function DatePicker({
  selectedDate,
  onDateChange,
}: {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick an event end date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// EventModal Component
interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  addEvent: (newEvent: Event) => void;
}

interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
  startTime: string;
  endTime: string;
  venue: string;
  price: string;
  eventDate: string;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  addEvent,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [venue, setVenue] = useState("");
  const [eventEndDate, setEventEndDate] = useState<Date | undefined>(undefined);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  // Time inputs
  const [startTime, setStartTime] = useState("");
  const [startAmPm, setStartAmPm] = useState("AM");
  const [endTime, setEndTime] = useState("");
  const [endAmPm, setEndAmPm] = useState("AM");

  const check = () => {
    console.log('checking', isCreatingEvent)
  }
check()
  // Loading state for image upload
  const [eventImageLoading, setEventImageLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setEventImageLoading(true); // Show spinner
    try {
      const url = await uploadToPinata(file);
      if (url) {
        setImage(url); // Store the uploaded URL
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setEventImageLoading(false); // Hide spinner
    }
  };
  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEvent(true);
    try {
      if (!eventEndDate) {
        console.error("Event end date is required");
        toast.error("Event end date is required");
        return;
      }

      // Convert the eventEndDate and start/end times into full DateTime strings
      const fullStartTime = new Date(
        `${format(eventEndDate, "yyyy-MM-dd")} ${startTime} ${startAmPm}`
      );
      const fullEndTime = new Date(
        `${format(eventEndDate, "yyyy-MM-dd")} ${endTime} ${endAmPm}`
      );

      // Convert to Unix timestamps (seconds)
      const startUnix = Math.floor(fullStartTime.getTime() / 1000); // Start time in Unix timestamp
      const endUnix = Math.floor(fullEndTime.getTime() / 1000); // End time in Unix timestamp

      // Convert eventEndDate to Unix timestamp (just the date, no time)
      const eventDateUnix = Math.floor(eventEndDate.getTime() / 1000); // Event date in Unix timestamp
      const nftUri = await uploadNFT(image, title, description);
      console.log(nftUri.data);
      // Create newEvent object with Unix timestamps for startTime, endTime, and eventEndDate
      const newEvent: Event = {
        id: Date.now(),
        title,
        image: nftUri.data as string, // Event image URL
        description,
        startTime: startUnix.toString(), // Store Unix timestamp as string for smart contract
        endTime: endUnix.toString(), // Store Unix timestamp as string for smart contract
        venue,
        price,
        eventDate: eventDateUnix.toString(), // Include event end date as Unix timestamp
      };
      await writeContractAsync({
        address: ventura.address as `0x${string}`,
        abi: ventura.abi,
        functionName: "createEvent",
        args: [
          newEvent.title,
          newEvent.image,
          newEvent.description,
          newEvent.startTime,
          newEvent.endTime,
          newEvent.venue,
          newEvent.price,
          newEvent.eventDate,
        ],
      });

      // Add the event to the list
      addEvent(newEvent);

      // Close the modal and clear form
      onClose();
      resetForm();
      toast.success("Successfully created event");
    } catch (error) {
      console.log(error);
    }
    setIsCreatingEvent(false);
  };

  const resetForm = () => {
    setTitle("");
    setImage("");
    setDescription("");
    setPrice("");
    setVenue("");
    setEventEndDate(undefined);
    setStartTime("");
    setEndTime("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white py-8 px-4 rounded-lg w-[500px] lg:max-h-[800px] overflow-y-auto max-h-[680px]">
        <h2 className="mb-4 text-2xl font-bold">Create New Event</h2>

        <blockquote className="flex items-start p-4 mb-6 bg-green-100 rounded-lg">
          <FaInfoCircle className="mr-3 text-2xl text-green-500" />
          <span className="text-sm text-green-800">
            Please upload an event image.
          </span>
        </blockquote>

        <form onSubmit={handleSubmit}>
          {/* Upload Event Image */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg">
              {!image ? (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  {eventImageLoading ? (
                    <FaSpinner className="text-4xl text-gray-400 animate-spin" />
                  ) : (
                    <>
                      <FaUpload className="text-4xl text-gray-400" />
                      <span className="mt-2 text-sm">Upload Event Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    required
                  />
                </label>
              ) : (
                <img
                  src={image}
                  alt="Event"
                  className="absolute object-cover w-full h-full rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-2 border rounded"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Short Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          {/* Venue */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Event End Date</label>
            <DatePicker
              selectedDate={eventEndDate}
              onDateChange={setEventEndDate}
            />
          </div>

          {/* Time Inputs */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Start Time</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="4:30"
                className="w-2/3 px-2 py-1 border rounded"
                required
              />
              <select
                value={startAmPm}
                onChange={(e) => setStartAmPm(e.target.value)}
                className="w-1/3 px-2 py-1 border rounded"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">End Time</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="10:00"
                className="w-2/3 px-2 py-1 border rounded"
                required
              />
              <select
                value={endAmPm}
                onChange={(e) => setEndAmPm(e.target.value)}
                className="w-1/3 px-2 py-1 border rounded"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between mt-8">
            <div
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-3 text-white bg-red-600 rounded cursor-pointer"
            >
              <FaTrash />
              <span className="py-2 text-white">Cancel</span>
            </div>

            <div className="flex items-center justify-center gap-2 px-3 text-white bg-black rounded">
              <FaBuilding />
              <button
                type="submit"
                className="py-2 text-white bg-black rounded"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
