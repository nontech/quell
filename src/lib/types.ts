export interface CalendarEventType {
  id: number | string;
  title: string;
  start: Date | string;
  end: Date | string;
  type?: string;
  location?: string;
  description?: string;
}
