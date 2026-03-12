import {
  services,
  sops,
  usefulLinks,
  escalationTeams,
  type Service,
  type SOP,
  type UsefulLink,
  type EscalationTeam,
} from "@/data";

export type SearchResultItem = Service | SOP | UsefulLink | EscalationTeam;

export interface SearchResults {
  services: Service[];
  sops: SOP[];
  usefulLinks: UsefulLink[];
  escalationTeams: EscalationTeam[];
  total: number;
}

function matchesQuery(item: { title: string; description: string }, query: string): boolean {
  const q = query.toLowerCase().trim();
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

export function search(query: string): SearchResults {
  if (!query.trim()) {
    return { services: [], sops: [], usefulLinks: [], escalationTeams: [], total: 0 };
  }

  const matchedServices = services.filter((s) => matchesQuery(s, query));
  const matchedSops = sops.filter((s) => matchesQuery(s, query));
  const matchedLinks = usefulLinks.filter((s) => matchesQuery(s, query));
  const matchedTeams = escalationTeams.filter((s) => matchesQuery(s, query));

  return {
    services: matchedServices,
    sops: matchedSops,
    usefulLinks: matchedLinks,
    escalationTeams: matchedTeams,
    total:
      matchedServices.length +
      matchedSops.length +
      matchedLinks.length +
      matchedTeams.length,
  };
}
