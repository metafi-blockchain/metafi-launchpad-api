

docker buildx build --platform linux/amd64 -t metafi/launchpad-api:0.1.0 --load .

docker buildx build --platform linux/amd64,linux/arm64 -t metafi/launchpad-api:0.1.0 --push .

docker push metafi/launchpad-api:0.1.0