export type FamilyRole = 'parent' | 'child' | 'other';

export interface Member {
  id: string;
  name: string;
  role: FamilyRole;
  color?: string; // color for calendar/events
}
