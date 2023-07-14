import { environment } from "src/environments/environment"

export class Endpoints{
   static  urls = {
        "auth":{
            "login": environment.api+"auth/login",
            "logout": environment.api+"auth/logout"
        },
        "stats":{
            "loginPageStats":environment.api+"loginPageStats",
            "getLoginUserStatsByName":environment.api+"loginUserStats/name",
            "userStats":environment.api+"LoginUserStats",
            "getSessionsLowerThanFive":environment.api+"loginUserStats/SessionsLowerThanFive",
    
        }
    
    }
}
