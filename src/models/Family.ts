import { Member } from './Member';
import { ScheduleEvent } from './Event';

export interface Family {
  members: Member[];
  events: ScheduleEvent[];
}
