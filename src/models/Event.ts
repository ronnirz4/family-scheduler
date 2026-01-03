export type EventType = 'once' | 'daily' | 'weekly';

export type EventCategory =
  | 'appointments'
  | 'flights'
  | 'meetings'
  | 'work'
  | 'university'
  | 'restaurant';

export interface ScheduleEvent {
  id: string;
  title: EventCategory;
  start: string; // ISO date string
  end?: string;
  memberId?: string; // assigned family member
  type: EventType;
  notes?: string;
}
