export interface Host {
  userId: number;
  nickname: string;
  avatarImageUrl: string;
}
export interface Participant {
  userId: number;
  nickname: string;
  avatarImageUrl: string;
}
export interface Post {
  meetingId: number;
  title: string;
  content: string;
  regionCode: string | null;
  meetingPlace: string;
  meetingAddress: string;
  meetingAt: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  gameNameJson: string;
  participants: Participant[];
  host: Host;
}
