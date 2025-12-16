export interface NotificationItem {
  createdAt: string;
  id: number;
  isRead: boolean;
  message: string;
  readAt: string | null;
  resourceId: number;
  relatedUserId: number;
  title: string;
  type: "REGION_MEETING" | "MEETING_APPLICATION" | "APPLICATION_APPROVED" | "APPLICATION_DENIED";
}

export interface Notification {
  items: Array<NotificationItem>;
  total: number;
}
