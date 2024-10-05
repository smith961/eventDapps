import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Alice",
    username: "@alice",
    body: "Decentralized and secure. The automatic NFT ticketing is a game-changer!",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "I love how Eventos mints tickets as NFTs. It’s simple and secure.",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "Managing events has never been easier. NFT tickets are a brilliant touch!",
    img: "https://avatar.vercel.sh/eve",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "The NFT tickets make my events unique and decentralized. Love it!",
    img: "https://avatar.vercel.sh/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Eventos makes event creation so easy. The NFT feature is amazing.",
    img: "https://avatar.vercel.sh/dave",
  },
  {
    name: "Grace",
    username: "@grace",
    body: "Decentralized events with NFTs? Exactly what the future needs.",
    img: "https://avatar.vercel.sh/grace",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);


const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl  p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-white dark:from-background"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
