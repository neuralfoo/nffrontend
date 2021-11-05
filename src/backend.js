const backend = {}

backend.host = "http://localhost:50000"

backend.login = backend.host + "/app/login"
backend.signup = backend.host + "/app/signup"
backend.createTestboard = backend.host + "/app/testboard/create"
backend.getTestboard = backend.host + "/app/testboard/get/"
backend.updateTestboard = backend.host + "/app/testboard/update"
backend.validateToken = backend.host + "/app/auth/validate"
backend.listTestboards = backend.host + "/app/testboard/list"
backend.fetchUserDetails = backend.host + "/app/user/details/get"
backend.updateUserDetails = backend.host + "/app/user/details/update"
backend.changePassword = backend.host + "/app/user/changePassword"
backend.getReferralCode = backend.host + "/app/organization/referralCode/get"
backend.refreshReferralCode = backend.host + "/app/organization/referralCode/refresh"

export default backend