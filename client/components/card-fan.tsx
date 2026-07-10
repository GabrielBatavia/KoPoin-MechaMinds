import { MessageCircle, Eye } from "lucide-react";

interface ContentCard {
  initials: string;
  avatarColor: string;
  question: string;
  answers: number;
  views: string;
}

const CARDS: ContentCard[] = [
  {
    initials: "SC",
    avatarColor: "bg-rose-100 text-rose-600",
    question: "What's the best way to learn a new programming language fast?",
    answers: 47,
    views: "12.3k",
  },
  {
    initials: "AT",
    avatarColor: "bg-indigo-100 text-indigo-600",
    question: "How do I stay motivated when working on long-term projects?",
    answers: 83,
    views: "29.1k",
  },
  {
    initials: "MK",
    avatarColor: "bg-emerald-100 text-emerald-600",
    question: "What habits separate good engineers from great ones?",
    answers: 61,
    views: "18.7k",
  },
];

const CARD_HEIGHT = 400;
const TOP_PAD = 50;
const CARD_OFFSET_X = 148;
const FAN_ANGLE = 12;
const CENTER_LIFT = 14;
const CONTAINER_HEIGHT = Math.round(CARD_HEIGHT * 0.99) + TOP_PAD;

interface CardProps {
  card: ContentCard;
  style?: React.CSSProperties;
}

function Card({ card, style }: CardProps) {
  return (
    <div
      className="absolute w-52 mt-20 md:w-64 bg-card rounded-2xl border border-border p-5 flex flex-col gap-3"
      style={{
        height: CARD_HEIGHT,
        boxShadow:
          "0 8px 32px -4px oklch(0 0 0 / 12%), 0 2px 8px -2px oklch(0 0 0 / 8%)",
        ...style,
      }}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${card.avatarColor}`}
      >
        {card.initials}
      </div>

      <p className="text-foreground font-medium text-sm leading-snug flex-1">
        {card.question}
      </p>

      <div className="flex items-center gap-2.5 text-muted-foreground text-xs mt-auto">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          {card.answers} answers
        </span>
        <span className="w-px h-3 bg-border shrink-0" aria-hidden="true" />
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3 shrink-0" aria-hidden="true" />
          {card.views} views
        </span>
      </div>
    </div>
  );
}

export function CardFan() {
  return (
    <div className="relative w-full flex justify-center" aria-hidden="true">
      <div
        className="relative w-full max-w-7xl overflow-hidden"
        style={{
          height: CONTAINER_HEIGHT,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
        }}
      >
        <Card
          card={CARDS[0]}
          style={{
            left: "45%",
            top: TOP_PAD,
            transform: `translateX(calc(-50% - ${CARD_OFFSET_X}px)) rotate(-${FAN_ANGLE}deg)`,
            transformOrigin: "bottom center",
            zIndex: 1,
          }}
        />

        <Card
          card={CARDS[2]}
          style={{
            left: "55%",
            top: TOP_PAD,
            transform: `translateX(calc(-50% + ${CARD_OFFSET_X}px)) rotate(${FAN_ANGLE}deg)`,
            transformOrigin: "bottom center",
            zIndex: 1,
          }}
        />

        <Card
          card={CARDS[1]}
          style={{
            left: "50%",
            top: TOP_PAD - CENTER_LIFT,
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}
