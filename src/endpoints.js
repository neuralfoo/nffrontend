const endpoints = {}

endpoints.host = ""

endpoints.login = endpoints.host + "/login"
endpoints.dashboard = endpoints.host + "/dashboard"

endpoints.newTestboard = endpoints.host + "/testboard/new"
endpoints.getTestboard = endpoints.host + "/testboard/get/:testboardID"



export default endpoints