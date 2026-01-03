// src/services/familyService.ts
export type Member = {
  name: string;
  role: 'parent' | 'child';
  avatar: string; // image URL
};

export type Event = {
  member: string;
  date: string; // YYYY-MM-DD
  type: 'appointments' | 'flights' | 'meetings' | 'work' | 'university' | 'restaurant';
};

export type FamilyData = {
  members: Member[];
  events: Event[];
};

// fake database for now
const families: Record<string, FamilyData> = {
  ABC123: {
    members: [
      { name: 'Ron', role: 'child', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Irina', role: 'parent', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Emily', role: 'child', avatar: 'https://i.pravatar.cc/150?img=3' },
      { name: 'Alex', role: 'parent', avatar: 'https://i.pravatar.cc/150?img=4' },
      { name: 'Eva', role: 'child', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    events: [
      { member: 'Ron', date: '2026-01-05', type: 'appointments' },
      { member: 'Irina', date: '2026-01-07', type: 'flights' },
      { member: 'Emily', date: '2026-01-09', type: 'work' },
      { member: 'Alex', date: '2026-01-10', type: 'university' },
      { member: 'Eva', date: '2026-01-11', type: 'restaurant' },
    ],
  },
};

export async function getFamilyByCode(code: string): Promise<FamilyData | null> {
  // simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  return families[code] ?? null;
}
