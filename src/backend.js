const backend = {}

backend.host = "http://localhost:50000"

backend.login 				= backend.host + "/app/login"
backend.signup 				= backend.host + "/app/signup"
backend.createTestboard 	= backend.host + "/app/testboard/create"
backend.getTestboard 		= backend.host + "/app/testboard/get/"
backend.updateTestboard 	= backend.host + "/app/testboard/update"
backend.validateToken 		= backend.host + "/app/auth/validate"
backend.listTestboards 		= backend.host + "/app/testboard/list"
backend.fetchUserDetails 	= backend.host + "/app/user/details/get"
backend.updateUserDetails 	= backend.host + "/app/user/details/update"
backend.changePassword 		= backend.host + "/app/user/changePassword"
backend.getReferralCode 	= backend.host + "/app/organization/referralCode/get"
backend.refreshReferralCode = backend.host + "/app/organization/referralCode/refresh"
backend.uploadImageFile 	= backend.host + "/app/fs/image/upload"
backend.getImageFile 		= backend.host + "/app/fs/image/"
backend.getTestFiles 		= backend.host + "/app/testboard/testFiles/list"
backend.deleteTestFiles 	= backend.host + "/app/testboard/testFiles/delete"
backend.updateAnnotation 	= backend.host + "/app/testboard/testFiles/annotation/update"
backend.deleteTest 			= backend.host + "/app/testcontroller/test/delete"
backend.listApiHits			= backend.host + "/app/testcontroller/test/hitlist"

backend.runAccuracyTestImgClf 	= backend.host + "/app/testcontroller/imageclassification/accuracytest/action"
backend.getImgClfAccuracyTests 	= backend.host + "/app/testcontroller/imageclassification/accuracytest/list"
backend.getImgClfAccuracyReport = backend.host + "/app/testcontroller/imageclassification/accuracytest/get"

export default backend