import { Asana, AsanaPosition } from '@/types/anatomy';

export function filterAsanas(
  asanas: Asana[],
  searchTerm: string,
  position: AsanaPosition | null,
): Asana[] {
  const term = searchTerm.trim();
  return asanas.filter((a) => {
    const matchesSearch =
      a.name_ko.includes(term) ||
      a.name_en.toLowerCase().includes(term.toLowerCase()) ||
      a.name_sanskrit.toLowerCase().includes(term.toLowerCase());
    const matchesPosition = position === null || a.position === position;
    return matchesSearch && matchesPosition;
  });
}
