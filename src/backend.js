const backend = {}

backend.host = "http://localhost:50000"

backend.login = backend.host + "/app/login"
backend.createTestboard = backend.host + "/app/testboard/create"
backend.getTestboard = backend.host + "/app/testboard/get/"
backend.updateTestboard = backend.host + "/app/testboard/update"
backend.validateToken = backend.host + "/app/auth/validate"
backend.listTestboards = backend.host + "/app/testboard/list"


export default backend