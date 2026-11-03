export interface IEvent {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnailImageUrl: string;
  location: string;
  date: string; // "2026-11-20"
  email: string; // email of the person who created the event
  creatorName?: string;
  participants?: number; // only sent by the single-event API
}
