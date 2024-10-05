import React, { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa6"; // Import Ethereum and success icons
import { nfts } from "@/data"; // Import NFT data
import { HiOutlineCursorClick } from "react-icons/hi";
import { uploadNFT } from "@/utils/uploadNFT";

// Define the structure of the timeLeft object
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Define the structure of an NFT object
interface NFT {
  id: number;
  name: string;
  image: string;
  endTimestamp: string; // Use JavaScript date string for the end timestamp
  price: number;
  description: string;
}

// Helper function to calculate time remaining for the end of the event (claimable time)
const calculateTimeLeft = (endTimestamp: string): TimeLeft | null => {
  const now = Date.now(); // Get the current time in milliseconds
  const end = new Date(endTimestamp).getTime(); // Convert the end date to milliseconds

  const difference = end - now; // Difference in milliseconds

  // If the end date is in the past, return null (nothing to display)
  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const NFTCard: React.FC<{ nft: NFT }> = ({ nft }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft(nft.endTimestamp)
  );
  const [isClaimable, setIsClaimable] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    const checkClaimableStatus = () => {
      const now = Date.now();
      const end = new Date(nft.endTimestamp).getTime();

      // Check if the current time is past the endTimestamp
      if (now >= end) {
        setIsClaimable(true); // Event has passed, NFT is claimable
      } else {
        setIsClaimable(false); // Event not over, countdown is still active
      }
    };

    checkClaimableStatus(); // Check claimable status immediately

    // Set up an interval to update the timeLeft every second
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(nft.endTimestamp);
      setTimeLeft(updatedTimeLeft);

      checkClaimableStatus(); // Update claimable status based on the time
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [nft.endTimestamp]);

  const handleMinting = async () => {
    setIsMinting(true);
    const data = await uploadNFT(nft.image, nft.name, nft.description);
    console.log(data);
    setIsMinting(false);
    setIsClaimed(true);
  };
  return (
    <div
      className="flex flex-col overflow-hidden border rounded-lg shadow-lg"
      data-aos="fade-up" // AOS animation attribute
      data-aos-delay={nft.id * 100} // Delay animation based on the index of the NFT
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={nft.image}
          alt={nft.name}
          className="object-cover w-full h-64 transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
        {/* Badge */}
        <div className="absolute px-3 py-1 text-xs text-white bg-purple-600 rounded-full top-2 left-2">
          NFT
        </div>
      </div>

      {/* NFT Details */}
      <div className="flex-grow p-4">
        <h2 className="mb-2 text-xl font-bold">{nft.name}</h2>

        {/* Countdown Timer (if not yet claimable) */}
        {!isClaimable && timeLeft && (
          <div className="flex justify-center h-auto mt-6 space-x-2 text-black">
            <div className="flex flex-col items-center justify-center overflow-hidden text-xs font-bold rounded-lg bg-slate-100">
              <span className="px-4 py-2">{timeLeft.days}</span>
              <span className="text-[10px] bg-black w-full flex items-center justify-center text-white px-4">
                days
              </span>
            </div>
            <span className="mt-3 text-black">:</span>
            <div className="flex flex-col items-center justify-center overflow-hidden text-xs font-bold rounded-lg bg-slate-100">
              <span className="px-4 py-2">{timeLeft.hours}</span>
              <span className="text-[10px] bg-black w-full flex items-center justify-center text-white px-4">
                hrs
              </span>
            </div>
            <span className="mt-3 text-black">:</span>
            <div className="flex flex-col items-center justify-center overflow-hidden text-xs font-bold rounded-lg bg-slate-100">
              <span className="px-4 py-2">{timeLeft.minutes}</span>
              <span className="text-[10px] bg-black w-full flex items-center justify-center text-white px-4">
                mins
              </span>
            </div>
            <span className="mt-3 text-black">:</span>
            <div className="flex flex-col items-center justify-center overflow-hidden text-xs font-bold rounded-lg bg-slate-100">
              <span className="px-4 py-2">{timeLeft.seconds}</span>
              <span className="text-[10px] bg-black w-full flex items-center justify-center text-white px-4">
                secs
              </span>
            </div>
          </div>
        )}

        {/* Success Message when NFT is claimable */}
        {isClaimable && (
          <blockquote className="p-4 mt-4 text-sm text-green-700 bg-green-200 border-l-4 border-green-400 rounded-lg">
            <div className="flex items-center">
              <HiOutlineCursorClick className="mr-2 text-2xl" />
              <span className="italic">You can now claim your NFT!</span>
            </div>
          </blockquote>
        )}
      </div>

      {/* Claim Button and Price at the bottom */}
      <div className="flex items-center justify-between w-full p-4 mt-auto ">
        <div className="flex items-center justify-between w-full ">
          <button
            onClick={handleMinting}
            className={`px-4 py-2 text-white rounded-lg w-[50%] ${
              isClaimable
                ? "bg-slate-600 hover:bg-slate-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isClaimable}
          >
            {isClaimable
              ? isClaimed
                ? "Claimed"
                : isMinting
                ? "Minting"
                : "Claim NFT"
              : "Locked"}
          </button>

          {/* Price in Ethereum */}
          <div className="flex items-center ">
            <FaEthereum className="mr-1" />
            <span className="font-bold">{nft.price} ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ClaimNFTTab Component
const ClaimNFTTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default ClaimNFTTab;
