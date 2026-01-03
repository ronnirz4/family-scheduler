import { Family } from '../models';

export const mockFamily: Family = {
  members: [
    { id: 'm1', name: 'Ron', role: 'child', color: '#4CAF50' },
    { id: 'm2', name: 'Irina', role: 'parent', color: '#2196F3' },
    { id: 'm3', name: 'Emily', role: 'child', color: '#FF9800' },
    { id: 'm4', name: 'Alex', role: 'parent', color: '#9C27B0' },
    { id: 'm5', name: 'Eva', role: 'child', color: '#FF5722' },
  ],
  events: [
    {
      id: 'e1',
      title: 'appointments',
      start: '2026-01-04T10:00:00',
      end: '2026-01-04T11:00:00',
      memberId: 'm1',
      type: 'once',
    },
    {
      id: 'e2',
      title: 'flights',
      start: '2026-01-05T07:00:00',
      end: '2026-01-05T10:00:00',
      memberId: 'm3',
      type: 'once',
    },
    {
      id: 'e3',
      title: 'work',
      start: '2026-01-04T09:00:00',
      end: '2026-01-04T17:00:00',
      memberId: 'm1',
      type: 'daily',
    },
    {
      id: 'e4',
      title: 'university',
      start: '2026-01-04T08:00:00',
      end: '2026-01-04T14:00:00',
      memberId: 'm3',
      type: 'weekly',
    },
    {
      id: 'e5',
      title: 'restaurant',
      start: '2026-01-06T19:00:00',
      memberId: 'm2',
      type: 'once',
    },
  ],
};
