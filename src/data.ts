import pic1 from "../src/assets/pic1.jpg";
import pic2 from "../src/assets/pic2.jpg";
import pic3 from "../src/assets/pic3.jpg";
import nft1 from "../src/assets/nft1.JPG";
import nft2 from "../src/assets/nft2.JPG";
import nft3 from "../src/assets/nft3.JPG";
import nft4 from "../src/assets/nft4.JPG";
import nft6 from "../src/assets/nft6.JPG";

export const nfts = [
  {
    id: 1,
    name: "Blockchain Conference 2023",
    endTimestamp: "2023-10-03T00:00:00", // Already claimable
    price: 0.25,
    image: nft1,
    description: "A premier event about blockchain technologies.",
  },
  {
    id: 2,
    name: "Web3 Developers Summit",
    endTimestamp: "2024-10-15T00:00:00", // Future event
    price: 0.3,
    image: nft2,
    description: "A premier event about blockchain technologies.",
  },
  {
    id: 3,
    name: "Metaverse Expo",
    endTimestamp: "2023-11-03T00:00:00", // Future event
    price: 0.4,
    image: nft3,
    description: "A premier event about blockchain technologies.",
  },
  {
    id: 4,
    name: "Future NFT 1",
    endTimestamp: "2024-12-10T00:00:00", // Future event
    price: 0.35,
    image: nft4,
    description: "A premier event about blockchain technologies.",
  },
  {
    id: 5,
    name: "Future NFT 2",
    endTimestamp: "2024-12-18T00:00:00", // Future event
    price: 0.45,
    image: nft6,
    description: "A premier event about blockchain technologies.",
  },
];

export const events = [
  {
    id: 1,
    name: "Blockchain Conference 2023",
    description: "A premier event about blockchain technologies.",
    date: "Wed, February 1, 2023, 12:00 am",
    location: "San Francisco, CA",
    price: 0.1,
    category: "Conference",
    image: pic1,
  },
  {
    id: 2,
    name: "Web3 Developers Summit",
    description: "The biggest gathering for Web3 developers.",
    date: "Thu, March 10, 2023, 10:00 am",
    location: "New York, NY",
    price: 0.15,
    category: "Summit",
    image: pic2,
  },
  {
    id: 3,
    name: "NFT Art Expo 2023",
    description: "Showcasing the future of digital art with NFTs.",
    date: "Sat, April 15, 2023, 5:00 pm",
    location: "Los Angeles, CA",
    price: 0.2,
    category: "Expo",
    image: pic3,
  },
  {
    id: 4,
    name: "DeFi Protocol Meetup",
    description: "Discussing decentralized finance protocols.",
    date: "Tue, May 23, 2023, 2:00 pm",
    location: "Austin, TX",
    price: 0.08,
    category: "Meetup",
    image: pic1,
  },
  {
    id: 5,
    name: "Smart Contract Workshop",
    description: "Hands-on workshop on building smart contracts.",
    date: "Mon, June 5, 2023, 9:00 am",
    location: "Seattle, WA",
    price: 0.12,
    category: "Workshop",
    image: pic2,
  },
  {
    id: 6,
    name: "DAO Governance Conference",
    description: "Exploring the future of decentralized governance.",
    date: "Wed, July 12, 2023, 11:00 am",
    location: "Chicago, IL",
    price: 0.18,
    category: "Conference",
    image: pic2,
  },
  {
    id: 7,
    name: "Crypto Mining Expo 2023",
    description: "A deep dive into the world of cryptocurrency mining.",
    date: "Fri, August 25, 2023, 3:00 pm",
    location: "Denver, CO",
    price: 0.22,
    category: "Expo",
    image: pic1,
  },
  {
    id: 8,
    name: "Metaverse Developers Conference",
    description: "Building the future of virtual worlds and the metaverse.",
    date: "Sun, September 10, 2023, 1:00 pm",
    location: "Las Vegas, NV",
    price: 0.25,
    category: "Conference",
    image: pic2,
  },
  {
    id: 9,
    name: "Crypto Regulatory Summit",
    description: "Discussing the future of cryptocurrency regulation.",
    date: "Wed, October 20, 2023, 9:00 am",
    location: "Washington, D.C.",
    price: 0.14,
    category: "Summit",
    image: pic1,
  },
  {
    id: 10,
    name: "Decentralized Identity Workshop",
    description: "Workshop on self-sovereign identities and blockchain.",
    date: "Tue, November 28, 2023, 4:00 pm",
    location: "Portland, OR",
    price: 0.13,
    category: "Workshop",
    image: pic3,
  },
];
