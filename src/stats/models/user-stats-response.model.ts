export interface UserStatsResponse {
  id: number;
  userId: number;
  userName: string;
  sessionInMinutes: number;
  loginTime: Date;
  logoutTime: Date | null;
}
