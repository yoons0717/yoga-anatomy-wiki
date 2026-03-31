import { Muscle, BodyPart } from '@/types/anatomy';

export function filterMuscles(
  muscles: Muscle[],
  searchTerm: string,
  category: BodyPart | null,
): Muscle[] {
  const term = searchTerm.trim();
  return muscles.filter((m) => {
    const matchesSearch =
      m.name_ko.includes(term) ||
      m.name_en.toLowerCase().includes(term.toLowerCase());
    const matchesCategory = category === null || m.category === category;
    return matchesSearch && matchesCategory;
  });
}
