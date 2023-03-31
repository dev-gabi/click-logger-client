export const environment ={

    production:false,
    urls:{
        "auth":{
            "login":"http://localhost:39154/api/auth/login",
            "logout":"http://localhost:39154/api/auth/logout"
        },
        "stats":{
            "getLoginPageStats":"http://localhost:39154/api/loginPageStats",
            "getLoginUserStatsByName":"http://localhost:39154/api/loginUserStats/name",
            "userStats":"http://localhost:39154/api/LoginUserStats",
            "getSessionsLowerThanFive":"http://localhost:39154/api/loginUserStats/SessionsLowerThanFive"
        }

    }
}