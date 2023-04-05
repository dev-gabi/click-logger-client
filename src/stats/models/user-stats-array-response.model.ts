import { ApiResponse } from "./api-response.model";
import { UserStatsResponse } from "./user-stats-response.model";


export interface UserStatsArrayResponse extends ApiResponse{
  stats:UserStatsResponse[]
}
