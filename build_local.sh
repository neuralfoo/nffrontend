# export REACT_APP_BACKEND_HOST=http://localhost:50000
# export REACT_APP_FRONTEND_HOST=http://localhost:3000
# npm run build
docker build . -t nf-frontend:1 -f Dockerfile.local