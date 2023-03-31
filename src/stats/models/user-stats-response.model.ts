import { ApiResponse } from "./api-response.model";
import { UserStats } from "./user-stats.model";

export interface UserStatsResponse extends ApiResponse{
  stats:UserStats[]
}
