const endpoints = {}

endpoints.host = "http://localhost:3000"

endpoints.login =  "/login"
endpoints.signup =  "/signup"

endpoints.dashboard =  "/dashboard"
endpoints.settings =  "/settings"

endpoints.newTestboard =  "/testboard/new"
endpoints.getTestboard =  "/testboard/get/:testboardID"

endpoints.getTestboardPrefix =  "/testboard/get/"

endpoints.onboardMemberPrefix = endpoints.host + "/onboard/"
endpoints.onboardMember =  "/onboard/:referralCode"


export default endpoints