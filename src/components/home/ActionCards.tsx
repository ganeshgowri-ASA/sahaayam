'use client';

interface ActionCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  textColor: string;
}

const cards: ActionCard[] = [
  {
    id: 'service',
    title: 'Request for SERVICE',
    subtitle: 'Submit a service request for IT support, equipment, or software.',
    icon: '🛠️',
    gradient: 'from-blue-500 to-blue-700',
    textColor: 'text-white',
  },
  {
    id: 'incident',
    title: 'Raise an INCIDENT',
    subtitle: 'Report a technical issue or system outage for immediate assistance.',
    icon: '⚠️',
    gradient: 'from-blue-600 to-indigo-700',
    textColor: 'text-white',
  },
  {
    id: 'kyit',
    title: 'KYIT – Know Your IT',
    subtitle: 'Explore IT guides, FAQs, and knowledge articles.',
    icon: '💡',
    gradient: 'from-teal-500 to-teal-700',
    textColor: 'text-white',
  },
  {
    id: 'domain',
    title: 'Consultant Domain Renewal',
    subtitle: 'Renew consultant domain access and credentials seamlessly.',
    icon: '🔄',
    gradient: 'from-orange-400 to-rose-500',
    textColor: 'text-white',
  },
];

interface ActionCardsProps {
  onCardClick?: (cardId: string) => void;
}

export default function ActionCards({ onCardClick }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 max-w-5xl mx-auto">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => onCardClick?.(card.id)}
          className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 flex flex-col items-start gap-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left cursor-pointer`}
        >
          <span className="text-4xl">{card.icon}</span>
          <div>
            <h3 className={`font-bold text-lg leading-snug ${card.textColor}`}>{card.title}</h3>
            <p className={`text-sm mt-1 opacity-90 ${card.textColor}`}>{card.subtitle}</p>
          </div>
          <span className={`mt-auto text-xs font-semibold uppercase tracking-wide opacity-75 ${card.textColor}`}>
            Click to proceed →
          </span>
        </button>
      ))}
    </div>
  );
}
